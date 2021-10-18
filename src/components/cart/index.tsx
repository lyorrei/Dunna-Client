import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/Cart'
import Link from 'next/link'

import {
    Container,
    Title,
    Message,
    Total,
    CartItemsContainer,
    CartBox,
    Methods
} from './style'
import { ProductInterface } from '../product'

import CartItem from '../cartItem'
import { CheckoutButton } from '../button'
import { FaShoppingCart } from 'react-icons/fa'

import { useHistory } from '../../context/History'

interface Props {
    showCart: boolean
    setShowCart(boolean: boolean): void
}

const cart: React.FC<Props> = ({ showCart, setShowCart }) => {
    const { cart } = useCart()
    const [total, setTotal] = useState(0)

    const { addToHistory } = useHistory()

    let cartElements = <Message>O carrinho está vazio</Message>
    if (cart.length !== 0) {
        cartElements = (
            <>
                <CartItemsContainer>
                    {cart.map((product: ProductInterface) => (
                        <CartItem {...product} key={product._id} />
                    ))}
                </CartItemsContainer>

                <Total>
                    Total: <span>{(total / 100).toFixed(2)}</span>
                </Total>
                <Methods>Pagamento através de todos os cartões via:</Methods>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridGap: '2rem'
                    }}
                >
                    <Link href={'/checkout?method=stripe'}>
                        <CheckoutButton
                            onClick={() =>
                                addToHistory('/checkout?method=stripe')
                            }
                            right
                        >
                            Stripe
                        </CheckoutButton>
                    </Link>
                    <Link href={'/checkout?method=paypal'}>
                        <CheckoutButton
                            onClick={() =>
                                addToHistory('/checkout?method=paypal')
                            }
                        >
                            Paypal
                        </CheckoutButton>
                    </Link>
                </div>
            </>
        )
    }

    useEffect(() => {
        let totalPrice = 0
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price
        }
        setTotal(totalPrice)
    }, [cart])

    return (
        <>
            <Container showCart={showCart}>
                <CartBox onClick={() => setShowCart(!showCart)}>
                    {cart.length !== 0 && <span>{cart.length}</span>}
                    <FaShoppingCart />
                </CartBox>

                <Title>Meu carrinho</Title>
                {cartElements}
            </Container>
        </>
    )
}

export default cart
