const nodemailer = require('nodemailer')
const { service, user } = require('./mail.json')

const transporter = nodemailer.createTransport({
    service,
    auth: {
        user,
        pass: process.env.MAIL_PASSWORD,
    },
})

module.exports = transporter
