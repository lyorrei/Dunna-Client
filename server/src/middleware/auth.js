const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        const user = await User.findOne({ _id: decoded._id })


        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

exports.admin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token, admin: true })
        const user = await User.findOne({ _id: decoded._id, admin: true })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
