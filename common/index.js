const Product = require('../server/src/models/product')
const ProductType = require('../server/src/models/productType')
const Type = require('../server/src/models/type')
const Stone = require('../server/src/models/stone')
const Shape = require('../server/src/models/shape')
require('../server/src/models/productImage')
require('../server/src/models/metal')
require('../server/src/models/orderItem')

const getProducts = async queryType => {
    const match = {
        sold: false,
        visible: true
    }
    if (queryType) {
        if (queryType === 'Gema') {
            const productType = await ProductType.findOne({
                name: 'Pedra Lapidada'
            })
            match.productType = productType._id
        } else if (queryType === 'Desconto') {
            match.discount = true
        } else if (queryType === 'Men') {
            match.forMen = true
        } else if (queryType === 'Wedding') {
            match.forWedding = true
        } else {
            const type = await Type.findOne({ name: queryType })
            if (type) match.type = type._id
        }
    }

    const fetchedProducts = await Product.find(match)
    const productsPromise = fetchedProducts.map(
        async product => await product.populate('images').execPopulate()
    )
    const products = await Promise.all(productsPromise)

    return products
}

const getAllVisibleProducts = async () => {
    const match = {
        sold: false,
        visible: true
    }

    const products = await Product.find(match)
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
    await product.populate('type').execPopulate()

    return product
}

const getSpotlightProducts = async () => {
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
        return products
    }

    const productsPromise = fetchedProducts.map(
        async product => await product.populate('images').execPopulate()
    )
    const products = await Promise.all(productsPromise)
    return products
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
    getAllVisibleProducts,
    getSingleProduct,
    getSpotlightProducts,
    getStones,
    getShapes,
    getProductTypes
}
