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
import OrderPrice from '../../../components/orderPrice'
import CartItem from '../../../components/cartItem'
import { InlineButton } from '../../../components/button'

import {
    PageContainer,
    Container,
    Title,
    SubTitle,
    ButtonContainer
} from '../../../styles/pages/checkout/success'
import { CartItemContainer } from '../../../components/checkoutCart/style'

import { Coupon } from '../../coupons'

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
    totalAmountWithoutCoupon: number
    orderItems: OrderItems[]
    shipping: Shipping
    coupon?: Coupon
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
                            <CartItem product={item} key={item._id} />
                        ))}
                    </CartItemContainer>
                    <SubTitle>Detalhes do endereço:</SubTitle>
                    <OrderAddress order={order} />

                    {order.coupon && (
                        <SubTitle>
                            Cupom:
                            <span>
                                R$ {(order.coupon.value / 100).toFixed(2)}
                            </span>
                        </SubTitle>
                    )}

                    <OrderPrice
                        discount={order.coupon ? true : false}
                        noDiscountPrice={
                            order.coupon ? order.totalAmountWithoutCoupon : null
                        }
                        discountPrice={order.totalAmount}
                        primaryColor
                        next
                    />

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
