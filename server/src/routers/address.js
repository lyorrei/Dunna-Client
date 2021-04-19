const express = require('express')
const router = express.Router()

const { auth: authMiddleware, admin: adminMiddleware } = require('../middleware/auth')

const Address = require('../models/address')

router.get('/api/addresses', authMiddleware, async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user._id })
        res.send(addresses)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/addressesall', adminMiddleware, async (req, res) => {
    try {
        const addresses = await Address.find({})
        res.send(addresses)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/address/:id', authMiddleware, async (req, res) => {
    try {
        const address = await Address.findOne({ _id: req.params.id, user: req.user._id })
        res.send(address)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/api/address/create', authMiddleware, async (req, res) => {
    try {
        const address = new Address(req.body)
        address.user = req.user._id
        await address.save()
        res.status(201).send(address)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/api/address/:id', authMiddleware, async (req, res) => {
    const allowedUpdates = ['city', 'state', 'street', 'number', 'zip', 'additional_info', 'phone']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const address = await Address.findOne({ _id: req.params.id, user: req.user._id })
        updates.forEach((update) => (address[update] = req.body[update]))
        await address.save()
        res.send(address)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/address/:id', authMiddleware, async (req, res) => {
    try {
        const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        if (!address) {
            return res.status(400).send({ error: 'Address not found' })
        }
        res.send(address)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
