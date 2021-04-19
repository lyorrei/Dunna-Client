const mongoose = require('mongoose')

const metalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})

const Metal = mongoose.model('Metal', metalSchema)

module.exports = Metal