const mongoose = require('mongoose')

const shapeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Shape || mongoose.model('Shape', shapeSchema)
