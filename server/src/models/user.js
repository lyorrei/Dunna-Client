const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const transporter = require('../config/mailer')
const { email: senderEmail } = require('../config/mail.json')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        select: false
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    }
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true,
    //         },
    //     },
    // ],
})

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user_id'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 2 * 60 * 60
    })
    // user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.generateConfirmEmail = async function () {
    const user = this

    jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 2 * 60 * 60 },
        async (err, emailToken) => {
            const url = `${process.env.APP_URL}/api/user/confirmation/${emailToken}`

            await transporter.verify((error, success) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Server is ready to take our messages')
                }
            })

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: `"Dunna Jewelry" <` + senderEmail + `>`, // sender address
                to: user.email,
                subject: 'Confirmar Email',
                html: `Por favor clique no link para confirmar seu email: <a href="${url}">${url}</a>`
            })

            // console.log('Message sent: %s', info.messageId)
        }
    )
}

userSchema.methods.generateChangePasswordEmail = async function () {
    const user = this

    jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 2 * 60 * 60 },
        async (err, token) => {
            const url = `${process.env.CLIENT_URL}/reset/${token}`

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: `"Dunna Jewelry" <` + senderEmail + `>`, // sender address
                to: user.email,
                subject: 'Editar senha',
                html: `Por favor, clique no Link para trocar sua senha: <a href="${url}">${url}</a>`
            })

            // console.log('Message sent: %s', info.messageId)
        }
    )
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new Error('Não foi possivel entrar')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Não foi possivel entrar')
    }

    if (!user.confirmed) {
        throw new Error('Confirme seu email')
    }


    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
