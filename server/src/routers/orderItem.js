const express = require('express')
const router = express.Router()

const { auth: authMiddleware, admin: adminMiddleware } = require('../middleware/auth')

const OrderItem = require('../models/orderItem')

// router.get('/orders', authMiddleware, async (req, res) => {
//     try {
//         const orders = await OrderItem.find({ user: req.user._id })
//         for (let i = 0; i < orders.length; i++) {
//             await orders[i]
//                 .populate({
//                     path: 'shipping',
//                     populate: {
//                         path: 'address',
//                     },
//                 })
//                 .execPopulate()
//         }
//         res.send(orders)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get('/api/ordersitemsall', adminMiddleware, async (req, res) => {
    try {
        const orders = await OrderItem.find({})
        // for (let i = 0; i < orders.length; i++) {
        //     await orders[i]
        //         .populate({
        //             path: 'shipping',
        //             populate: {
        //                 path: 'address',
        //             },
        //         })
        //         .execPopulate()
        // }
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/orderitem/create', authMiddleware, async (req, res) => {
    try {
        const orderItem = new OrderItem(req.body)
        await orderItem.save()
        res.status(201).send(orderItem)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
