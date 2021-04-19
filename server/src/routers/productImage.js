const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('../config/multer')

const ProductImage = require('../models/productImage')
const Product = require('../models/product')

const { admin: adminMiddleware } = require('../middleware/auth')

routes.get('/api/productimage', adminMiddleware, async (req, res) => {
    const productImage = await ProductImage.find()

    return res.json(productImage)
})

routes.get('/api/productimage/:id', adminMiddleware, async (req, res) => {
    const productImage = await ProductImage.findOne({ _id: req.params.id })

    return res.json(productImage)
})

routes.get('/api/productimage/product/:id', adminMiddleware, async (req, res) => {
    const productImages = await ProductImage.find({ product: req.params.id })

    return res.json(productImages)
})

routes.post('/api/productimage', adminMiddleware, multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file
    try {
        const product = await Product.findOne({ _id: req.body.product })
        if (!product) {
            return res.status(400).send({ error: 'Produto não encontrado' })
        }
        if (product.sold) {
            return res.status(400).send({ error: 'Produto vendido' })
        }
        const productImage = await ProductImage.create({
            product: req.body.product,
            name,
            size,
            key,
            url,
        })
        return res.json(productImage)
    } catch (e) {
        res.status(400).send({ error: e })
    }
})
// 5fee6704caae506cec1d14d3

routes.delete('/api/productimage/:id', adminMiddleware, async (req, res) => {
    const post = await ProductImage.findById(req.params.id)

    await post.remove()

    return res.send()
})

module.exports = routes
