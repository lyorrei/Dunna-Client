const express = require('express')
const router = express.Router()
const axios = require('axios').default

const transporter = require('../config/mailer')
const { email: senderEmail } = require('../config/mail.json')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const { auth: authMiddleware } = require('../middleware/auth')

const Product = require('../models/product')
const Shipping = require('../models/shipping')
const Address = require('../models/address')
const OrderAddress = require('../models/orderAddress')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')

const check = async (addressId, userId, cart, amount) => {
    // CHECK IF ADDRESS EXISTS
    const address = await Address.findOne({
        _id: addressId,
        user: userId
    })
    if (!address) {
        throw new Error({
            message: 'Payment Failed',
            error: 'Please provide a valid address'
        })
    }

    // CHECK IF ALL PRODUCTS EXISTS
    const products = cart.map(
        async product =>
            await Product.findOne({
                _id: product._id,
                sold: false,
                notBuyable: false
            })
    )
    const resultado = await Promise.all(products).catch(e => {
        throw new Error({
            message: 'Payment Failed',
            error: 'Products not found'
        })
    })

    // CHECK IF THE AMOUNT IS CORRECT
    let totalAmount = 0
    resultado.forEach(product => {
        totalAmount = totalAmount + product.price
    })

    if (parseInt(amount) !== totalAmount) {
        throw new Error({
            message: 'Payment Failed',
            error: 'Amount is incorrect'
        })
    }

    return { address, totalAmount }
}

const create = async (addressId, userId, amount, cart) => {
    // CREATE ORDER ADDRESS
    const address = await Address.findOne({ _id: addressId, user: userId })
    const convertedAddress = address.toOrderAddress()
    const orderAddress = new OrderAddress(convertedAddress)
    await orderAddress.save()

    // CREATE SHIPPING
    const shipping = new Shipping({
        order_address: orderAddress._id,
        ship_charge: 0,
        status: 'Processando'
    })
    await shipping.save()

    // CREATE ORDER
    const order = new Order({
        user: userId,
        totalAmount: amount,
        shipping: shipping._id
    })
    await order.save()

    // LOOP THROUGH CART
    for (let i = 0; i < cart.length; i++) {
        // CREATE ORDER ITEM
        const orderItem = new OrderItem({
            order: order._id,
            product: cart[i]._id
        })
        await orderItem.save()

        // CHANGE PRODUCT FIELD SOLD TO TRUE
        const product = await Product.findOne({
            _id: cart[i]._id,
            sold: false,
            notBuyable: false
        })
        product.visible = false
        product.notBuyable = true
        product.sold = true
        await product.save()
    }

    return { createdOrderId: order._id }
}

const sendEmail = (userName, userEmail, saleValue, address, access_token) => {
    // Checar se está em ambiente de produção
    if (process.env.NODE_ENV === 'production') {
        // Mandar Email para Matheus
        transporter
            .sendMail({
                from: `"Dunna Jewelry" <` + senderEmail + `>`, // sender address
                to: 'matheusqtorres@gmail.com',
                subject: 'Pedido Criado',
                html: `Pedido foi criado por ${userName}. Cheque a página de pedidos do Site!`
            })
            .catch(err => {})

        // Mandar requisições para RD Station
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        }

        const conversionData = JSON.stringify({
            event_type: 'CONVERSION',
            event_family: 'CDP',
            payload: {
                conversion_identifier: 'Venda',
                name: userName,
                email: userEmail,
                country: 'Brasil',
                city: address.city,
                state: address.state,
                personal_phone: address.phone.toString()
            }
        })
        axios
            .post(
                'https://api.rd.services/platform/events',
                conversionData,
                options
            )
            .catch(e => {})

        const saleData = JSON.stringify({
            event_type: 'SALE',
            event_family: 'CDP',
            payload: {
                funnel_name: 'default',
                email: userEmail,
                value: saleValue / 100
            }
        })
        axios
            .post('https://api.rd.services/platform/events', saleData, options)
            .catch(e => {})
    }
}

router.post('/api/charge', authMiddleware, async (req, res) => {
    const { cart, amount, addressId, paymentData } = req.body

    try {
        // Checar se está tudo ok
        const { address, totalAmount } = await check(
            addressId,
            req.user._id,
            cart,
            amount
        )

        // CREATE PAYMENT INTENT
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'BRL',
            description: 'Dunna Jewelry',
            receipt_email: req.user.email,
            shipping: {
                name: `${req.user.firstName} ${req.user.lastName}`,
                address: {
                    line1: `${address.street} ${address.number}`,
                    line2: address.additional_info
                        ? address.additional_info
                        : null,
                    city: address.city,
                    country: 'BR',
                    state: address.state,
                    postal_code: address.zip
                }
            },
            confirm: true,
            payment_method_data: {
                type: 'card',
                card: { token: paymentData.token }
            }
        })

        // Criar tables no banco de dados
        const { createdOrderId } = await create(
            addressId,
            req.user._id,
            amount,
            cart
        )

        // Enviar emails para Matheus e RD Station
        sendEmail(
            req.user.firstName + ' ' + req.user.lastName,
            req.user.email,
            amount,
            address,
            req.cookies.rd_access_token
        )
        res.send({
            createdOrderId
        })
    } catch (e) {
        res.status(400).send({
            message: 'Payment Failed',
            success: false,
            error: e.message
        })
    }
})

// 1. Set up your server to make calls to PayPal
const paypal = require('@paypal/checkout-server-sdk')
const payPalClient = require('../common/paypal')

router.post('/api/paypal/create', authMiddleware, async (req, res) => {
    const { cart, amount, addressId } = req.body

    try {
        // Checar se está tudo ok
        const { address } = await check(addressId, req.user._id, cart, amount)

        // Capturar ordem Paypal
        const request = new paypal.orders.OrdersCreateRequest()
        request.prefer('return=representation')
        request.requestBody({
            intent: 'CAPTURE',
            application_context: {
                shipping_preference: 'SET_PROVIDED_ADDRESS'
            },
            purchase_units: [
                {
                    amount: {
                        currency_code: 'BRL',
                        value: amount / 100,
                        breakdown: {
                            item_total: {
                                currency_code: 'BRL',
                                value: amount / 100
                            }
                        }
                    },
                    shipping: {
                        name: {
                            full_name: `${req.user.firstName} ${req.user.lastName}`
                        },
                        address: {
                            address_line_1: `${address.street} ${address.number}`,
                            address_line_2: address.additional_info
                                ? address.additional_info
                                : null,
                            admin_area_2: address.city,
                            admin_area_1: address.state,
                            postal_code: address.zip,
                            country_code: 'BR'
                        }
                    },
                    items: cart.map(product => ({
                        name: product.name,
                        quantity: 1,
                        description: product.description,
                        unit_amount: {
                            currency_code: 'BRL',
                            value: product.price / 100
                        }
                    }))
                }
            ],
            payer: {
                email_address: req.user.email,
                name: {
                    given_name: req.user.firstName,
                    surname: req.user.lastName
                }
            }
        })

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
    const { cart, amount, addressId, orderId } = req.body

    try {
        // Checar se está tudo ok
        const { address } = await check(addressId, req.user._id, cart, amount)

        // Captar ordem capturada
        const request = new paypal.orders.OrdersCaptureRequest(orderId)
        request.requestBody({})

        // Executar ordem capturada
        const capture = await payPalClient.client().execute(request)

        // Criar tables no banco de dados
        const { createdOrderId } = await create(
            addressId,
            req.user._id,
            amount,
            cart
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
