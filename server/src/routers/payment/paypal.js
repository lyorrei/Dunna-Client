const express = require('express')
const router = express.Router()

const { auth: authMiddleware } = require('../../middleware/auth')

// 1. Set up your server to make calls to PayPal
const paypal = require('@paypal/checkout-server-sdk')
const payPalClient = require('../../common/paypal')

const { check, create, sendEmail } = require('./helper')
const { paypalPayload } = require('./payload')

router.post('/api/paypal/create', authMiddleware, async (req, res) => {
    const { cart, couponName, amount, addressId } = req.body

    try {
        // Checar se está tudo ok
        const { address, verifiedAmount, amountWithoutCoupon, verifiedCoupon } =
            await check(addressId, req.user._id, cart, amount, couponName)

        // Capturar ordem Paypal
        const request = new paypal.orders.OrdersCreateRequest()
        request.prefer('return=representation')
        request.requestBody(
            paypalPayload(
                verifiedAmount,
                amountWithoutCoupon,
                req.user,
                address,
                cart,
                verifiedCoupon
            )
        )

        // Executar captura Paypal
        const order = await payPalClient.client().execute(request)
        res.status(200).send({
            orderId: order.result.id
        })
    } catch (err) {
        res.status(400).send({
            message: 'Payment Failed',
            success: false,
            error: err.message
        })
    }
})

router.post('/api/paypal/capture', authMiddleware, async (req, res) => {
    // 2a. Get the order ID from the request body
    const { cart, couponName, amount, addressId, orderId } = req.body

    try {
        // Checar se está tudo ok
        const { address, verifiedAmount, amountWithoutCoupon, verifiedCoupon } = await check(
            addressId,
            req.user._id,
            cart,
            amount,
            couponName
        )

        // Captar ordem capturada
        const request = new paypal.orders.OrdersCaptureRequest(orderId)
        request.requestBody({})

        // Executar ordem capturada
        const capture = await payPalClient.client().execute(request)

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
            amount,
            address,
            req.cookies.rd_access_token
        )
        res.send({ createdOrderId })
    } catch (err) {
        res.status(400).send({
            message: 'Payment Failed',
            success: false,
            error: e.message
        })
    }
})

module.exports = router
