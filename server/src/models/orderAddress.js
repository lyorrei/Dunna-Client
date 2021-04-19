const mongoose = require('mongoose')

const orderAddresSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        additional_info: {
            type: String,
            required: false
        },
        phone: {
            type: Number,
            required: true
        }
    }
)

const OrderAddress = mongoose.model('OrderAddress', orderAddresSchema)

module.exports = OrderAddress
