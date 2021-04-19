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

router.post('/api/charge', authMiddleware, async (req, res) => {
    const { cart, amount, addressId } = req.body

    try {
        // return res.status(400).send({ message: 'Payment Failed', error: 'Tente novamente mais tarde' })

        // CHECK IF ADDRESS EXISTS
        const address = await Address.findOne({ _id: addressId, user: req.user._id })
        if (!address) {
            return res.status(400).send({ error: 'Please provide a valid address' })
        }

        // CHECK IF ALL PRODUCTS EXISTS
        const products = cart.map(async (product) => await Product.findOne({ _id: product._id, sold: false }))
        const resultado = await Promise.all(products).catch((e) => {
            return res.status(400).send({ message: 'Payment Failed', error: 'Products not found' })
        })

        // CHECK IF THE AMOUNT IS CORRECT
        let totalAmount = 0
        resultado.forEach((product) => {
            totalAmount = totalAmount + product.price
        })

        if (parseInt(amount) !== totalAmount) {
            return res.status(400).send({ message: 'Payment Failed', error: 'Amount is incorrect' })
        }

        // CREATE PAYMENT INTENT
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'BRL',
            description: 'Dunna Jewelry',
            receipt_email: req.user.email,
        })

        // CREATE ORDER ADDRESS
        const convertedAddress = address.toOrderAddress()
        const orderAddress = new OrderAddress(convertedAddress)
        await orderAddress.save()

        // CREATE SHIPPING
        const shipping = new Shipping({ order_address: orderAddress._id, ship_charge: 0, status: 'Processando' })
        await shipping.save()

        // CREATE ORDER
        const order = new Order({ user: req.user._id, totalAmount, shipping: shipping._id })
        await order.save()

        // LOOP THROUGH CART
        for (let i = 0; i < cart.length; i++) {

            // CREATE ORDER ITEM
            const orderItem = new OrderItem({ order: order._id, product: cart[i]._id })
            await orderItem.save()

            // CHANGE PRODUCT FIELD SOLD TO TRUE
            const product = await Product.findOne({ _id: cart[i]._id, sold: false })
            product.sold = true
            await product.save()
        }

        res.send({ client_secret: paymentIntent['client_secret'], orderId: order._id })
    } catch (e) {
        res.status(400).send({
            message: 'Payment Failed',
            success: false,
            error: e.message,
        })
    }
})

// router.post('/charge', authMiddleware, async (req, res) => {
//     console.log('stripe-routes.js 9 | route reached', req.body)

//     const { id, requestProducts, amount } = req.body

//     try {
//         const products = requestProducts.map(async (product) => await Product.findById(product))
//         const resultado = await Promise.all(products).catch((e) => {
//             res.status(400).send({ message: 'Payment Failed', error: 'Products not found' })
//         })
//         let totalAmount = 0

//         resultado.forEach((product) => {
//             totalAmount = totalAmount + product.price
//         })

//         if (parseInt(amount) !== totalAmount) {
//             throw new Error()
//         }

//         const payment = await stripe.paymentIntents.create({
//             amount: totalAmount,
//             currency: 'BRL',
//             description: 'Your Company Description',
//             payment_method: id,
//             confirm: true,
//         })
//         res.json({
//             message: 'Payment Successful',
//             success: true,
//         })
//     } catch (e) {
//         res.status(400).send({
//             message: 'Payment Failed',
//             success: false,
//         })
//     }
// })

module.exports = router
