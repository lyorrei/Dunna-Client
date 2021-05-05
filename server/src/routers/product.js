const express = require('express')
const router = express.Router()

const { admin: adminMiddleware } = require('../middleware/auth')

const Product = require('../models/product')
const ProductImage = require('../models/productImage')
const OrderItem = require('../models/orderItem')
const Type = require('../models/type')
const ProductType = require('../models/productType')

const { getProducts } = require('../common')

router.get('/api/products', async (req, res) => {
    try {
        const match = {
            sold: false,
            visible: true
        }
        if (req.query.type) {
            if (req.query.type === 'Gema') {
                const productType = await ProductType.findOne({
                    name: 'Pedra Lapidada'
                })
                match.productType = productType._id
            } else {
                const type = await Type.findOne({ name: req.query.type })
                if (type) match.type = type._id
            }
        }

        const fetchedProducts = await Product.find(match)
        const productsPromise = fetchedProducts.map(
            async product => await product.populate('images').execPopulate()
        )
        const products = await Promise.all(productsPromise)
        // const products = await getProducts()
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/products/spotlight', async (req, res) => {
    try {
        const fetchedProducts = await Product.find({
            sold: false,
            visible: true,
            spotlight: true
        })

        if (fetchedProducts.length === 0) {
            const lastProducts = await Product.find({
                sold: false,
                visible: true
            }).limit(3)
            const lastProductsPromise = lastProducts.map(
                async product => await product.populate('images').execPopulate()
            )
            const products = await Promise.all(lastProductsPromise)
            return res.send(products)
        }

        const productsPromise = fetchedProducts.map(
            async product => await product.populate('images').execPopulate()
        )
        const products = await Promise.all(productsPromise)
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/productsall', adminMiddleware, async (req, res) => {
    try {
        const fetchedProducts = await Product.find({})
        for (let i = 0; i < fetchedProducts.length; i++) {
            await fetchedProducts[i].populate('images').execPopulate()
            await fetchedProducts[i].populate('shape').execPopulate()
            await fetchedProducts[i].populate('stone').execPopulate()
            await fetchedProducts[i].populate('orderItem').execPopulate()
            // await fetchedProducts[i].populate('productType').execPopulate()

            if (fetchedProducts[i].type) {
                await fetchedProducts[i].populate('type').execPopulate()
            }
        }

        res.send(fetchedProducts)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        await product.populate('images').execPopulate()
        await product.populate('shape').execPopulate()
        await product.populate('stone').execPopulate()
        await product.populate('productType').execPopulate()
        await product.populate('metal').execPopulate()
        await product.populate('orderItem').execPopulate()
        await product.populate('type').execPopulate()

        res.send(product)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/api/product/create', adminMiddleware, async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.patch('/api/product/edit/:id', adminMiddleware, async (req, res) => {
    const allowedUpdates = [
        'name',
        'description',
        'price',
        'stone',
        'stoneWeigth',
        'diamondWeigth',
        'shape',
        'stock_id',
        'productType',
        'type',
        'metal',
        'visible',
        'spotlight'
    ]
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const product = await Product.findOne({ _id: req.params.id })
        const orderItem = await OrderItem.find({ product: product._id })
        if (orderItem.length > 0) {
            return res.status(400).send({ error: 'Produto foi vendido' })
        }

        product.diamondWeigth = undefined
        product.metal = undefined
        product.type = undefined

        updates.forEach(update => (product[update] = req.body[update]))
        await product.save()
        res.send(product)
    } catch (e) {
        if (e) {
            res.status(400).send({ error: e.message })
        }
    }
})

router.delete('/api/product/:id', adminMiddleware, async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).send()
        }
        if (product.sold) {
            return res.status(404).send({ error: 'Produto vendido' })
        }
        const productImage = await ProductImage.find({ product: product._id })
        for (let i = 0; i < productImage.length; i++) {
            await productImage[i].remove()
        }

        await product.remove()
        // const productImages = await productImage.find({ product: product._id })
        // for (let i = 0; i < productImages; i++) {
        //     await productImages[i].remove()
        // }
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
