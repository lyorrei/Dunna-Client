const express = require('express')
const router = express.Router()

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
            await Product.findOne({ _id: product._id, sold: false, visible: true })
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
            visible: true
        })
        product.visible = false
        product.sold = true
        await product.save()
    }

    return { createdOrderId: order._id }
}

router.post('/api/charge', authMiddleware, async (req, res) => {
    const { cart, amount, addressId, paymentData } = req.body

    try {
        // return res.status(400).send({
        //     message: 'Payment Failed',
        //     success: false
        // })

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

        const { createdOrderId } = await create(
            addressId,
            req.user._id,
            amount,
            cart
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
        // return res.status(400).send({
        //     message: 'Payment Failed',
        //     success: false
        // })
        const { address } = await check(addressId, req.user._id, cart, amount)
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

        order = await payPalClient.client().execute(request)
        res.status(200).send({
            orderId: order.result.id
        })
    } catch (err) {
        res.status(400).send({
            message: 'Payment Failed',
            success: false,
            error: e.message
        })
    }
})

router.post('/api/paypal/capture', authMiddleware, async (req, res) => {
    // 2a. Get the order ID from the request body
    const { cart, amount, addressId, orderId } = req.body

    try {
        // return res.status(400).send({
        //     message: 'Payment Failed',
        //     success: false
        // })

        await check(addressId, req.user._id, cart, amount)

        const request = new paypal.orders.OrdersCaptureRequest(orderId)
        request.requestBody({})
        const capture = await payPalClient.client().execute(request)

        const { createdOrderId } = await create(
            addressId,
            req.user._id,
            amount,
            cart
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
