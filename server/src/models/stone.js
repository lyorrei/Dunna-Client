const mongoose = require('mongoose')

const stoneSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Stone || mongoose.model('Stone', stoneSchema)
