import React from 'react'
import { useCart } from '../../context/Cart'
import { CartItemContainer, Cart } from './style'

import CartItem from '../cartItem'

import CheckoutCoupon from '../checkoutCoupon'

import OrderPrice from '../orderPrice'

interface Props {}

const checkoutCart: React.FC<Props> = () => {
    const { cart, cartPrice, coupon, cartNoDiscountPrice } = useCart()

    let cartPriceWithCoupon = cartPrice

    if (coupon) {
        cartPriceWithCoupon = cartPrice - coupon.value
    }

    return (
        <Cart>
            <CartItemContainer>
                {cart.map(product => (
                    <CartItem product={product} key={product._id} />
                ))}
            </CartItemContainer>

            <CheckoutCoupon />

            <OrderPrice
                discount={coupon ? true : false}
                noDiscountPrice={cartPrice}
                discountPrice={cartPriceWithCoupon}
            />
        </Cart>
    )
}

export default checkoutCart
