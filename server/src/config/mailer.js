const nodemailer = require('nodemailer')
const { service, port, user } = require('./mail.json')

const transporter = nodemailer.createTransport({
    service,
    port,
    auth: {
        user,
        pass: process.env.MAIL_PASSWORD,
    },
})

module.exports = transporter
