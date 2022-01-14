import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/Cart'

import { Container, Title, Message, CartItemsContainer, CartBox } from './style'
import { ProductInterface } from '../product'

import CartItem from '../cartItem'

import CartButtons from '../cartButtons'
import { AiOutlineShopping } from 'react-icons/ai'

import OrderPrice from '../orderPrice'

interface Props {
    showCart: boolean
    setShowCart(boolean: boolean): void
}

const cart: React.FC<Props> = ({ showCart, setShowCart }) => {
    const { cart, cartPrice, cartNoDiscountPrice, cartDiscount } = useCart()

    let cartElements = <Message>A sacola está vazio</Message>
    if (cart.length !== 0) {
        cartElements = (
            <>
                <CartItemsContainer>
                    {cart.map((product: ProductInterface) => (
                        <CartItem
                            product={product}
                            deletable
                            key={product._id}
                        />
                    ))}
                </CartItemsContainer>

                <OrderPrice
                    discount={cartDiscount !== 0}
                    noDiscountPrice={cartNoDiscountPrice}
                    discountPrice={cartPrice}
                    marginBottom
                />

                <CartButtons />
            </>
        )
    }

    return (
        <Container showCart={showCart}>
            <CartBox onClick={() => setShowCart(!showCart)}>
                {cart.length !== 0 && <span>{cart.length}</span>}
                <AiOutlineShopping />
            </CartBox>

            <Title>Sacola</Title>
            {cartElements}
        </Container>
    )
}

export default cart
