const mongoose = require('mongoose')

const type = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports =
    mongoose.models.Type || mongoose.model('Type', type)
