const express = require('express')
const router = express.Router()

const { auth: authMiddleware, admin: adminMiddleware } = require('../middleware/auth')

const Shipping = require('../models/shipping')
const Address = require('../models/address')

router.get('/api/shippings', authMiddleware, async (req, res) => {
    try {
        const shippings = await Shipping.find({ user: req.user._id })
        res.send(shippings)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/shippingsall', adminMiddleware, async (req, res) => {
    try {
        const shippings = await Shipping.find({})
        res.send(shippings)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/shipping/create', authMiddleware, async (req, res) => {
    try {
        const address = await Address.findOne({ _id: req.body.address, user: req.user._id })
        if (!address) {
            return res.status(400).send({ error: 'Please provide a valid address' })
        }

        const shipping = new Shipping(req.body)
        await shipping.save()
        res.status(201).send(shipping)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/api/shipping/edit/:id', adminMiddleware, async (req, res) => {
    const allowedUpdates = ['status']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const shipping = await Shipping.findOne({ _id: req.params.id })
        updates.forEach((update) => (shipping[update] = req.body[update]))
        await shipping.save()
        res.send(shipping)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
