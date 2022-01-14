const express = require('express')
const router = express.Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const { auth: authMiddleware } = require('../../middleware/auth')
const { stripePayload } = require('./payload')
const { check, sendEmail, create} = require('./helper')

router.post('/api/charge', authMiddleware, async (req, res) => {
    const { cart, couponName, amount, addressId, paymentData } = req.body

    try {
        // Checar se está tudo ok
        const { address, verifiedAmount, amountWithoutCoupon, verifiedCoupon } = await check(
            addressId,
            req.user._id,
            cart,
            amount,
            couponName
        )

        // CREATE PAYMENT INTENT
        const paymentIntent = await stripe.paymentIntents.create(
            stripePayload(verifiedAmount, req.user, address, paymentData)
        )

        // Criar tables no banco de dados
        const { createdOrderId } = await create(
            addressId,
            req.user._id,
            verifiedAmount,
            amountWithoutCoupon,
            cart,
            verifiedCoupon
        )

        // Enviar emails para Matheus e RD Station
        sendEmail(
            req.user.firstName + ' ' + req.user.lastName,
            req.user.email,
            verifiedAmount,
            address,
            req.cookies.rd_access_token
        )
        res.send({
            createdOrderId
        })
    } catch (err) {
        res.status(400).send({
            message: 'Payment Failed',
            success: false,
            error: err.message
        })
    }
})

module.exports = router
