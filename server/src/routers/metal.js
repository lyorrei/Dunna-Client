const express = require('express')
const router = express.Router()

const { admin: adminMiddleware } = require('../middleware/auth')

const Metal = require('../models/metal')
const Product = require('../models/product')

router.get('/api/metals', async (req, res) => {
    try {
        const metals = await Metal.find({})
        res.send(metals)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/metals/create', adminMiddleware, async (req, res) => {
    try {
        const metal = new Metal(req.body)

        await metal.save()
        res.status(201).send(metal)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/metal/:id', adminMiddleware, async (req, res) => {
    try {
        const metal = await Metal.findOne({ _id: req.params.id })
        if (!metal) {
            return res.status(404).send({ error: e })
        }

        const products = await Product.find({ metal: metal._id })
        if (products.length > 0) {
            return res.status(400).send({ error: 'Formato utilizado em um produto' })
        }

        await metal.remove()
        res.send(metal)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
