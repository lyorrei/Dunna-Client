const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        productType: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ProductType'
        },
        stock_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stone: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Stone'
        },
        stoneWeigth: {
            type: Number,
            required: true
        },
        diamondWeigth: {
            type: Number,
            required: false
        },
        shape: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Shape'
        },
        metal: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Metal'
        },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Type'
        },
        sold: {
            type: Boolean,
            required: true,
            default: false
        },
        spotlight: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
)

productSchema.virtual('orderItem', {
    ref: 'OrderItem',
    localField: '_id',
    foreignField: 'product'
})

productSchema.virtual('images', {
    ref: 'ProductImage',
    localField: '_id',
    foreignField: 'product'
})

productSchema.set('toObject', { virtuals: true })
productSchema.set('toJSON', { virtuals: true })

module.exports =
    mongoose.models.Product || mongoose.model('Product', productSchema)
