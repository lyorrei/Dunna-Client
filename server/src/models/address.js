const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    additional_info: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: true,
    },
})

addressSchema.methods.toOrderAddress = function () {
    const address = this
    const addressObject = address.toObject()
    delete addressObject._id
    delete addressObject.__v
    return addressObject
}

const Address = mongoose.model('Address', addressSchema)

module.exports = Address
