const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const axios = require('axios').default

const nodemailer = require('nodemailer')

const User = require('../models/user')
const {
    auth: authMiddleware,
    admin: adminMiddleware
} = require('../middleware/auth')

router.get('/api/users', adminMiddleware, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/api/users/create', async (req, res) => {
    try {
        // Checar se usuário existe
        const emailUser = await User.findOne({ email: req.body.email })
        if (emailUser) {
            throw new Error('Uma conta com esse Email já existe')
        }

        // Criar usuário
        const user = new User(req.body)
        user.admin = false
        user.confirmed = false
        await user.save()

        // Enviar Email de Confirmação
        user.generateConfirmEmail()

        // Retornar Status
        res.status(201).send()
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.post('/api/user/confirmation/resend', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            confirmed: false
        })
        if (!user) {
            throw new Error()
        }

        user.generateConfirmEmail()

        res.status(201).send()
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/api/user/confirmation/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)
        const emailUser = await User.findOne({ _id: decoded._id })
        if (!emailUser) {
            throw new Error('Conta não encontrada')
        }
        emailUser.confirmed = true
        await emailUser.save()

        // RD Station Setup
        if (process.env.NODE_ENV === 'production') {
            // Criar Lead RD Station
            const data = JSON.stringify({
                event_type: 'CONVERSION',
                event_family: 'CDP',
                payload: {
                    conversion_identifier: 'Criar conta',
                    name: emailUser.firstName + ' ' + emailUser.lastName,
                    email: emailUser.email
                }
            })
            await axios
                .post('https://api.rd.services/platform/events', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + req.cookies.rd_access_token
                    }
                })
                .catch(e => {})
        }

        return res.redirect(process.env.CLIENT_URL + '/confirmation/success')
    } catch (e) {
        return res.redirect(process.env.CLIENT_URL + '/confirmation/fail')
    }
})

router.post('/api/user/password/reset', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            confirmed: true
        })
        if (!user) {
            throw new Error()
        }

        user.generateChangePasswordEmail()

        res.status(201).send()
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/api/user/reset/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, confirmed: true })
        if (!user) {
            throw new Error('Conta não encontrada')
        }
        user.password = req.body.password
        await user.save()

        return res.send()
    } catch (e) {
        return res.status(400).send()
    }
})

router.post('/api/users/login', async (req, res) => {
    try {
        // Procurar usuário
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        )

        // Gerar token
        const token = await user.generateAuthToken()

        const userResponse = user.toObject()
        delete userResponse.password

        // Colocar token em Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2 * 60 * 60 * 1000, // 2 Hours
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax'
        })

        // Criar Lead RD Station
        if (process.env.NODE_ENV === 'production') {
            const data = JSON.stringify({
                event_type: 'CONVERSION',
                event_family: 'CDP',
                payload: {
                    conversion_identifier: 'Entrar na conta',
                    name: user.firstName + ' ' + user.lastName,
                    email: user.email
                }
            })
            await axios
                .post('https://api.rd.services/platform/events', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + req.cookies.rd_access_token
                    }
                })
                .catch(e => {})
        }

        res.send(userResponse)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.post('/api/users/logout', authMiddleware, async (req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        // await req.user.save()
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2 * 60 * 60 * 1000,
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax'
        })
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/users/me', authMiddleware, async (req, res) => {
    res.send(req.user)
})

router.patch('/api/users/me', authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName']

    const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        if (req.body.email) {
            const emailUser = await User.findOne({ email: req.body.email })
            if (emailUser) {
                throw new Error('Uma conta com esse Email já existe')
            }
        }
        updates.forEach(update => (req.user[update] = req.body[update]))
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// router.delete('/api/users/me', adminMiddleware, async (req, res) => {
//     try {
//         await req.user.delete()
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// Check if user is an admin
router.get('/api/users/isadmin', adminMiddleware, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
