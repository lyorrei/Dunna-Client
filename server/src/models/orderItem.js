const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Order',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
    }
)

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = OrderItem
