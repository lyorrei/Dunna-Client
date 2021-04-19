const express = require('express')
const router = express.Router()

const { admin: adminMiddleware } = require('../middleware/auth')

const Stone = require('../models/stone')
const Product = require('../models/product')

router.get('/api/stones', async (req, res) => {
    try {
        const stones = await Stone.find({})
        res.send(stones)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/stones/create', adminMiddleware, async (req, res) => {
    try {
        const stone = new Stone(req.body)
        await stone.save()
        res.status(201).send(stone)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/stone/:id', adminMiddleware, async (req, res) => {
    try {
        const stone = await Stone.findOne({ _id: req.params.id })
        if (!stone) {
            return res.status(404).send({ error: e })
        }

        const products = await Product.find({ stone: stone._id })
        if (products.length > 0) {
            return res.status(400).send({ error: 'Pedra utilizada em um produto' })
        }

        await stone.remove()
        res.send(stone)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
