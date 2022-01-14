const mongoose = require('mongoose')

const UsedCoupon = require('./usedCoupon')

const orderCouponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },
        value: {
            type: Number,
            required: true
        },
        cartMinValue: {
            type: Number,
            required: true
        },
        expirable: {
            type: Boolean,
            required: true,
            default: false
        },
        validOnce: {
            type: Boolean,
            required: true,
            default: false
        },
        expirableDate: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
)

orderCouponSchema.virtual('usedCoupons', {
    ref: 'UsedCoupon',
    localField: '_id',
    foreignField: 'orderCoupon'
})

orderCouponSchema.set('toObject', { virtuals: true })
orderCouponSchema.set('toJSON', { virtuals: true })

const OrderCoupon = mongoose.model('OrderCoupon', orderCouponSchema)

module.exports = OrderCoupon
