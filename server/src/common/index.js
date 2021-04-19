const Product = require('../models/product')
const Stone = require('../models/stone')
const Shape = require('../models/shape')
const ProductType = require('../models/productType')

const getProducts = async () => {
    const fetchedProducts = await Product.find({ sold: false })
    const productsPromise = fetchedProducts.map(
        async product => await product.populate('images').execPopulate()
    )
    const products = await Promise.all(productsPromise)

    return products
}

const getSingleProduct = async id => {
    const product = await Product.findOne({ _id: id })
    await product.populate('images').execPopulate()
    await product.populate('shape').execPopulate()
    await product.populate('stone').execPopulate()
    await product.populate('productType').execPopulate()
    await product.populate('metal').execPopulate()
    await product.populate('orderItem').execPopulate()

    return product
}

const getStones = async () => {
    const stones = await Stone.find({})

    return stones
}

const getShapes = async () => {
    const shapes = await Shape.find({})

    return shapes
}

const getProductTypes = async () => {
    const productTypes = await ProductType.find({})

    return productTypes
}

module.exports = {
    getProducts,
    getSingleProduct,
    getStones,
    getShapes,
    getProductTypes
}
