const express = require('express')
const router = express.Router()

const { admin: adminMiddleware } = require('../middleware/auth')

const ProductType = require('../models/productType')

router.get('/api/productTypes', async (req, res) => {
    try {
        const productTypes = await ProductType.find({})
        res.send(productTypes)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/productTypes/create', adminMiddleware, async (req, res) => {
    try {
        const productType = new ProductType(req.body)

        await productType.save()
        res.status(201).send(productType)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
