const express = require('express')
const router = express.Router()

const { admin: adminMiddleware } = require('../middleware/auth')

const Type = require('../models/type')
const Product = require('../models/product')

router.get('/api/types', async (req, res) => {
    try {
        const types = await Type.find({})
        res.send(types)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/types/create', adminMiddleware, async (req, res) => {
    try {
        const type = new Type(req.body)

        await type.save()
        res.status(201).send(type)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/type/:id', adminMiddleware, async (req, res) => {
    try {
        const type = await Type.findOne({ _id: req.params.id })
        if (!type) {
            return res.status(404).send({ error: e })
        }

        const products = await Product.find({ type: type._id })
        if (products.length > 0) {
            return res.status(400).send({ error: 'Formato utilizado em um produto' })
        }

        await type.remove()
        res.send(type)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
