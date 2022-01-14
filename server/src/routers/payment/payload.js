const paypalPayload = (amount, amountWithoutCoupon, user, address, cart, coupon) => {
    return {
        intent: 'CAPTURE',
        application_context: {
            shipping_preference: 'SET_PROVIDED_ADDRESS'
        },
        purchase_units: [
            {
                amount: {
                    currency_code: 'BRL',
                    value: amount / 100,
                    breakdown: {
                        item_total: {
                            currency_code: 'BRL',
                            value: amountWithoutCoupon / 100
                        },
                        discount: {
                            currency_code: 'BRL',
                            value: coupon ? coupon.value / 100 : 0
                        }
                    }
                },
                shipping: {
                    name: {
                        full_name: `${user.firstName} ${user.lastName}`
                    },
                    address: {
                        address_line_1: `${address.street} ${address.number}`,
                        address_line_2: address.additional_info
                            ? address.additional_info
                            : null,
                        admin_area_2: address.city,
                        admin_area_1: address.state,
                        postal_code: address.zip,
                        country_code: 'BR'
                    }
                },
                items: cart.map(product => ({
                    name: product.name,
                    quantity: 1,
                    description: product.description,
                    unit_amount: {
                        currency_code: 'BRL',
                        value: product.price / 100
                    }
                }))
            }
        ],
        payer: {
            email_address: user.email,
            name: {
                given_name: user.firstName,
                surname: user.lastName
            }
        }
    }
}

const stripePayload = (totalAmount, user, address, paymentData) => {
    return {
        amount: totalAmount,
        currency: 'BRL',
        description: 'Dunna Jewelry',
        receipt_email: user.email,
        shipping: {
            name: `${user.firstName} ${user.lastName}`,
            address: {
                line1: `${address.street} ${address.number}`,
                line2: address.additional_info ? address.additional_info : null,
                city: address.city,
                country: 'BR',
                state: address.state,
                postal_code: address.zip
            }
        },
        confirm: true,
        payment_method_data: {
            type: 'card',
            card: { token: paymentData.token }
        }
    }
}

module.exports = { paypalPayload, stripePayload }
