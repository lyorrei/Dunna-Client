const express = require('express')
const router = express.Router()

const { admin: adminMiddleware } = require('../middleware/auth')

const Shape = require('../models/shape')
const Product = require('../models/product')

router.get('/api/shapes', async (req, res) => {
    try {
        const shapes = await Shape.find({})
        res.send(shapes)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/shapes/create', adminMiddleware, async (req, res) => {
    try {
        const shape = new Shape(req.body)

        await shape.save()
        res.status(201).send(shape)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/shape/:id', adminMiddleware, async (req, res) => {
    try {
        const shape = await Shape.findOne({ _id: req.params.id })
        if (!shape) {
            return res.status(404).send({ error: e })
        }

        const products = await Product.find({ shape: shape._id })
        if (products.length > 0) {
            return res.status(400).send({ error: 'Formato utilizado em um produto' })
        }

        await shape.remove()
        res.send(shape)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
