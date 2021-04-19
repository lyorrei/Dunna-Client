const mongoose = require('mongoose')

const shippingSchema = mongoose.Schema(
    {
        order_address: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'OrderAddress',
        },
        ship_charge: {
            type: Number,
            required: true,
            default: 0
        },
        status: {
            type: String,
            required: false
        }
    }
)

const Shipping = mongoose.model('Shipping', shippingSchema)

module.exports = Shipping
