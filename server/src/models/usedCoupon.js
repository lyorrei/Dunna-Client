const mongoose = require('mongoose')

const usedCouponSchema = new mongoose.Schema({
    orderCoupon: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Coupon'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const UsedCoupon = mongoose.model('UsedCoupon', usedCouponSchema)

module.exports = UsedCoupon
