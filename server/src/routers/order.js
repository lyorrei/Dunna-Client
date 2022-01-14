const express = require('express')
const router = express.Router()

const {
    auth: authMiddleware,
    admin: adminMiddleware
} = require('../middleware/auth')

const Order = require('../models/order')

router.get('/api/orders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: '-1' })
            .exec()
        for (let i = 0; i < orders.length; i++) {
            await orders[i]
                .populate({
                    path: 'shipping',
                    populate: {
                        path: 'order_address'
                    }
                })
                .populate({
                    path: 'orderItems',
                    populate: {
                        path: 'product',
                        populate: {
                            path: 'images'
                        }
                    }
                })
                .execPopulate()

            if (orders[i].coupon) {
                await orders[i].populate('coupon').execPopulate()
            }
        }
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/ordersall', adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({})
        for (let i = 0; i < orders.length; i++) {
            await orders[i]
                .populate({
                    path: 'user'
                })
                .populate({
                    path: 'shipping',
                    populate: {
                        path: 'order_address'
                    }
                })
                .populate({
                    path: 'orderItems',
                    populate: {
                        path: 'product',
                        populate: {
                            path: 'images'
                        }
                    }
                })
                .execPopulate()
        }
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/orderadmin/:id', adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id })
        await order
            .populate({
                path: 'user'
            })
            .populate({
                path: 'shipping',
                populate: {
                    path: 'order_address'
                }
            })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'images'
                    }
                }
            })
            .execPopulate()

        if (order.coupon) {
            await order.populate('coupon').execPopulate()
        }
        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/order/:id', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findOne({
            user: req.user._id,
            _id: req.params.id
        })
        await order
            .populate({
                path: 'user'
            })

            .populate({
                path: 'shipping',
                populate: {
                    path: 'order_address'
                }
            })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'images'
                    }
                }
            })
            .execPopulate()

        if (order.coupon) {
            await order.populate('coupon').execPopulate()
        }

        res.send(order)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/orders/create', authMiddleware, async (req, res) => {
    try {
        const order = new Order(req.body)
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/api/order/edit/:id', adminMiddleware, async (req, res) => {
    const allowedUpdates = ['totalAmount']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const order = await Order.findOne({ _id: req.params.id })
        updates.forEach(update => (order[update] = req.body[update]))
        await order.save()
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
