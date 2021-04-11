import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/Cart'
import {
    CartItemContainer,
    CartItem,
    Cart,
    ImageContainer,
    Img,
    Name,
    Price,
    Total
} from './style'

interface Props {
    total: number
    setTotal(number: number): void
}

const checkoutCart: React.FC<Props> = ({total, setTotal}) => {
    const { cart } = useCart()

    useEffect(() => {
        let totalPrice = 0
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price
        }
        setTotal(totalPrice)
    }, [cart])

    return (
        <Cart>
            <CartItemContainer>
                {cart.map(item => (
                    <CartItem key={item._id}>
                        <ImageContainer>
                            <Img src={item.images[0].url} alt="Product Image" />
                        </ImageContainer>
                        <Name>{item.name}</Name>
                        <Price>R$ {(item.price / 100).toFixed(2)}</Price>
                    </CartItem>
                ))}
            </CartItemContainer>

            <Total>
                <span>Total</span>
                <span>R$ {(total / 100).toFixed(2)}</span>
            </Total>
        </Cart>
    )
}

export default checkoutCart
