const express = require('express')
const router = express.Router()

const {
    auth: authMiddleware,
    admin: adminMiddleware
} = require('../middleware/auth')

const Coupon = require('../models/coupon')
const UsedCoupon = require('../models/usedCoupon') // IMPORTANT
const OrderCoupon = require('../models/orderCoupon') // IMPORTANT

router.get('/api/coupons', adminMiddleware, async (req, res) => {
    try {
        const coupons = await Coupon.find({})
        const couponsArray = []
        for (let i = 0; i < coupons.length; i++) {
            const orderCoupon = await OrderCoupon.find({
                name: coupons[i].name
            })
            const couponObject = coupons[i].toObject()

            if (orderCoupon) couponObject.orderCoupons = orderCoupon
            couponsArray.push(couponObject)
        }
        res.send(couponsArray)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/coupon/check', authMiddleware, async (req, res) => {
    try {
        const coupon = await Coupon.verifyCoupon(
            req.body.couponInput,
            req.user._id,
            req.body.cartPrice
        )

        res.send({
            message: `Cupom de R$ ${(coupon.value / 100).toFixed(
                2
            )} aplicado com sucesso! (${coupon.name})`,
            success: true,
            coupon
        })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.post('/api/coupons/create', adminMiddleware, async (req, res) => {
    try {
        // Checar se usuário existe
        const doesCuponExists = await Coupon.findOne({ name: req.body.name })
        if (doesCuponExists) {
            throw new Error('Uma conta com esse Cupom já existe!')
        }

        const coupon = new Coupon(req.body)
        coupon.gift = false

        const savedCoupon = await coupon.save()

        await savedCoupon.populate('usedCoupons').execPopulate()

        res.status(201).send(savedCoupon)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.delete('/api/coupon/:id', adminMiddleware, async (req, res) => {
    try {
        const coupon = await Coupon.findOneAndDelete({ _id: req.params.id })

        if (!coupon) {
            return res.status(400).send({ error: 'Coupon not found' })
        }
        res.send(coupon)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
