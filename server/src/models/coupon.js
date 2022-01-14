const mongoose = require('mongoose')

const UsedCoupon = require('./usedCoupon')
const OrderCoupon = require('./orderCoupon')

const couponSchema = new mongoose.Schema(
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
        },
        gift: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
)

couponSchema.methods.toOrderCoupon = function () {
    const coupon = this
    const couponObject = coupon.toObject()
    delete couponObject._id
    delete couponObject.__v
    return couponObject
}

couponSchema.statics.verifyCoupon = async function (name, userId, amount) {
    // ENCONTRAR COUPON
    const coupon = await Coupon.findOne({ name })
    if (!coupon) {
        throw new Error('Cupom não encontrado!')
    }

    // ENCONTRAR ORDER COUPON
    const orderCoupon = await OrderCoupon.findOne({ name })

    if (orderCoupon) {
        // CHECAR SE CUPOM JÁ FOI UTILIZADO POR ESSE USUÁRIO
        const usedCoupon = await UsedCoupon.findOne({
            orderCoupon: orderCoupon._id,
            user: userId
        })

        if (usedCoupon) {
            throw new Error('Cupom já utilizado!')
        }

        if (coupon.validOnce) {
            // CHECAR SE CUPOM JÁ FOI UTILIZADO POR ALGUÉM
            const usedCouponOnce = await UsedCoupon.findOne({
                orderCoupon: orderCoupon._id
            })

            if (usedCouponOnce) {
                throw new Error('Cupom já utilizado!')
            }
        }
    }

    // CHECAR SE VALOR DO CARRINHO É MAIOR DO QUE O COUPON.CARTMINVALUE
    if (amount < coupon.cartMinValue) {
        throw new Error(
            `A compra precisa ter um valor mínimo de R$ ${(
                coupon.cartMinValue / 100
            ).toFixed(2)} para que este cupom seja válido!`
        )
    }

    // CHECAR SE O CUPOM NÃO ESTÁ EXPIRADO
    const now = new Date()
    if (coupon.expirable && now >= coupon.expirableDate) {
        throw new Error('Cupom expirado!')
    }

    return coupon
}

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
