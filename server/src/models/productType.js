const mongoose = require('mongoose')

const productType = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports =
    mongoose.models.ProductType || mongoose.model('ProductType', productType)
