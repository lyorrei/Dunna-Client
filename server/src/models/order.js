const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        shipping: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Shipping',
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

orderSchema.virtual('orderItems', {
    ref: 'OrderItem',
    localField: '_id',
    foreignField: 'order',
})

orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
