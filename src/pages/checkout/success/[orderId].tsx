import React, { useEffect, useState } from 'react'
import axios from '../../../../axios'

import Head from 'next/head'
import Link from 'next/link'

import RequireAuthentication from '../../../HOC/requireAuthentication'

import { useCart } from '../../../context/Cart'

import { Address } from '../../addresses'

import { User } from '../../me'
import { NextPageContext } from 'next'
import { ProductInterface } from '../../../components/product'

import OrderAddress from '../../../components/orderAddress'

import {
    PageContainer,
    Container,
    Title,
    SubTitle,
    Total,
    ButtonContainer
} from '../../../styles/pages/checkout/success'
import {
    CartItemContainer,
    ImageContainer,
    Img,
    Name,
    Price,
    CartItem
} from '../../../components/checkoutCart/style'
import { InlineButton } from '../../../components/button'

const pageContainerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
}

interface OrderItems {
    _id: string
    order: string
    product: ProductInterface
}

interface Shipping {
    _id: string
    order_address: Address
    status: string
    ship_charge: number
}

export interface Order {
    _id: string
    totalAmount: number
    orderItems: OrderItems[]
    shipping: Shipping
    createdAt: string
    user: {
        admin: boolean
        _id: string
        firstName: string
        lastName: string
        email: string
    }
}

interface Props {
    order: Order
    user: User
}

const checkoutSuccess = ({ order, user }: Props) => {
    const { setCart } = useCart()

    useEffect(() => {
        setCart([])
    }, [])

    return (
        <>
            <Head>
                <title>DUNNA® | Checkout</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Sua compra foi realizada com sucesso!</Title>
                    <SubTitle>Itens do pedido:</SubTitle>
                    <CartItemContainer>
                        {order.orderItems.map(({ product: item }) => (
                            <CartItem key={item._id}>
                                <ImageContainer>
                                    <Img
                                        src={item.images[0].url}
                                        alt="Product Image"
                                    />
                                </ImageContainer>
                                <Name>{item.name}</Name>
                                <Price>
                                    R$ {(item.price / 100).toFixed(2)}
                                </Price>
                            </CartItem>
                        ))}
                    </CartItemContainer>
                    <SubTitle>Detalhes do endereço:</SubTitle>
                    <OrderAddress order={order} />

                    <Total>
                        <span>Total:</span>R${' '}
                        {(order.totalAmount / 100).toFixed(2)}
                    </Total>

                    <ButtonContainer>
                        <Link href="/orders">
                            <InlineButton>Ver meus pedidos</InlineButton>
                        </Link>
                    </ButtonContainer>
                </Container>
            </PageContainer>
        </>
    )
}

checkoutSuccess.getInitialProps = async (ctx: NextPageContext, token) => {
    const { data: order } = await axios.get('/order/' + ctx.query.orderId, {
        headers: {
            Cookie: `token=${token};`
        }
    })
    return { order }
}

export default RequireAuthentication(checkoutSuccess)
