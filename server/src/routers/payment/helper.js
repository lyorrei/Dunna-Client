const axios = require('axios').default

const transporter = require('../../config/mailer')
const { email: senderEmail } = require('../../config/mail.json')

const Product = require('../../models/product')
const Shipping = require('../../models/shipping')
const Address = require('../../models/address')
const OrderAddress = require('../../models/orderAddress')
const Order = require('../../models/order')
const OrderItem = require('../../models/orderItem')
const Coupon = require('../../models/coupon')
const UsedCoupon = require('../../models/usedCoupon')
const OrderCoupon = require('../../models/orderCoupon')

const check = async (addressId, userId, cart, amount, couponName) => {
    // CHECK IF ADDRESS EXISTS
    const address = await Address.findOne({
        _id: addressId,
        user: userId
    })
    if (!address) {
        throw new Error('Please provide a valid address')
    }

    // CHECK IF ALL PRODUCTS EXISTS
    const products = cart.map(
        async product =>
            await Product.findOne({
                _id: product._id,
                sold: false,
                notBuyable: false
            })
    )
    const resultado = await Promise.all(products).catch(e => {
        throw new Error('Products not found')
    })

    resultado.forEach(product => {
        if (product === null) {
            throw new Error('Products not found')
        }
    })

    // CHECK IF THE AMOUNT IS CORRECT
    let verifiedAmount = 0
    let amountWithoutCoupon = 0

    resultado.forEach(product => {
        verifiedAmount = verifiedAmount + product.price
        amountWithoutCoupon = amountWithoutCoupon + product.price
    })

    if (parseInt(amount) !== verifiedAmount) {
        throw new Error('Amount is incorrect')
    }

    // CHECK IF COUPON IS VALID
    let verifiedCoupon = null
    if (couponName) {
        verifiedCoupon = await Coupon.verifyCoupon(
            couponName,
            userId,
            verifiedAmount
        )
        verifiedAmount = verifiedAmount - verifiedCoupon.value
    }

    return { address, amountWithoutCoupon, verifiedAmount, verifiedCoupon }
}

const create = async (
    addressId,
    userId,
    amount,
    amountWithoutCoupon,
    cart,
    verifiedCoupon
) => {
    // CREATE ORDERCOUPON AND USEDCOUPON
    let orderCoupon = null
    if (verifiedCoupon) {
        orderCoupon = await OrderCoupon.findOne({
            name: verifiedCoupon.name
        })

        if (!orderCoupon) {
            const convertedCoupon = verifiedCoupon.toOrderCoupon()
            orderCoupon = new OrderCoupon(convertedCoupon)
            await orderCoupon.save()
        }

        const usedCoupon = new UsedCoupon({
            orderCoupon: orderCoupon._id,
            user: userId
        })
        await usedCoupon.save()
    }

    // CREATE ORDER ADDRESS
    const address = await Address.findOne({ _id: addressId, user: userId })
    const convertedAddress = address.toOrderAddress()
    const orderAddress = new OrderAddress(convertedAddress)
    await orderAddress.save()

    // CREATE SHIPPING
    const shipping = new Shipping({
        order_address: orderAddress._id,
        ship_charge: 0,
        status: 'Processando'
    })
    await shipping.save()

    // CREATE ORDER
    const orderPayload = {
        user: userId,
        totalAmount: amount,

        shipping: shipping._id
    }
    if (orderCoupon) {
        orderPayload.totalAmountWithoutCoupon = amountWithoutCoupon
        orderPayload.coupon = orderCoupon._id
    }

    const order = new Order(orderPayload)
    await order.save()

    // LOOP THROUGH CART
    for (let i = 0; i < cart.length; i++) {
        // CREATE ORDER ITEM
        const orderItem = new OrderItem({
            order: order._id,
            product: cart[i]._id
        })
        await orderItem.save()

        // CHANGE PRODUCT FIELD SOLD TO TRUE
        const product = await Product.findOne({
            _id: cart[i]._id,
            sold: false,
            notBuyable: false
        })
        product.visible = false
        product.notBuyable = true
        product.sold = true
        await product.save()
    }

    return { createdOrderId: order._id }
}

const sendEmail = (userName, userEmail, saleValue, address, access_token) => {
    // Checar se está em ambiente de produção
    if (process.env.NODE_ENV === 'production') {
        // Mandar Email para Matheus
        transporter
            .sendMail({
                from: `"Dunna Jewelry" <` + senderEmail + `>`, // sender address
                to: 'matheusqtorres@gmail.com',
                subject: 'Pedido Criado',
                html: `Pedido foi criado por ${userName}. Cheque a página de pedidos do Site!`
            })
            .catch(err => {})

        // Mandar requisições para RD Station
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        }

        const conversionData = JSON.stringify({
            event_type: 'CONVERSION',
            event_family: 'CDP',
            payload: {
                conversion_identifier: 'Venda',
                name: userName,
                email: userEmail,
                country: 'Brasil',
                city: address.city,
                state: address.state,
                personal_phone: address.phone.toString()
            }
        })
        axios
            .post(
                'https://api.rd.services/platform/events',
                conversionData,
                options
            )
            .catch(e => {})

        const saleData = JSON.stringify({
            event_type: 'SALE',
            event_family: 'CDP',
            payload: {
                funnel_name: 'default',
                email: userEmail,
                value: saleValue / 100
            }
        })
        axios
            .post('https://api.rd.services/platform/events', saleData, options)
            .catch(e => {})
    }
}

module.exports = { check, create, sendEmail }
