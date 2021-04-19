const nodemailer = require('nodemailer')
const { service, user, pass } = require('./mail.json')

const transporter = nodemailer.createTransport({
    service,
    auth: {
        user,
        pass,
    },
})

module.exports = transporter
