const express = require('express')
const router = express.Router()

const { auth: authMiddleware, admin: adminMiddleware } = require('../middleware/auth')

const OrderAddress = require('../models/orderAddress')

router.get('/api/orderaddresses', authMiddleware, async (req, res) => {
    try {
        const orderAddresses = await OrderAddress.find({ user: req.user._id })
        res.send(orderAddresses)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/orderaddressall', adminMiddleware, async (req, res) => {
    try {
        const orderAddresses = await OrderAddress.find({})
        res.send(orderAddresses)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/orderaddress/create', authMiddleware, async (req, res) => {
    try {
        const orderAddresses = new OrderAddress(req.body)
        orderAddresses.user = req.user._id
        await orderAddresses.save()
        res.status(201).send(orderAddresses)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
