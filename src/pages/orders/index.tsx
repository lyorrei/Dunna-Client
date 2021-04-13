import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Link from 'next/link'

import Moment from 'react-moment'

import OrderAddress from '../../components/orderAddress'

import {
    PageContainer,
    Container,
    Title,
    OrderBody,
    OrderBox,
    OrderHeader,
    OrdersContainer,
    DateParagraph,
    Total,
    ItensContainer,
    UntilDate,
    Obs,
    NoOrders
} from '../../styles/pages/orders'

import RequireAuthentication from '../../HOC/requireAuthentication'
import { Order } from '../checkout/success/[orderId]'
import {
    CartItemContainer,
    CartItem,
    ImageContainer,
    Img,
    Name,
    Price
} from '../../components/checkoutCart/style'

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

interface Props {
    myOrders: Order[]
}

const orders = ({ myOrders }: Props) => {
    useEffect(() => {
        console.log(myOrders)
    }, [])
    const statusHandler = (status: string) => {
        switch (status) {
            case 'Entregue':
                return 'Entregue'
            case 'Processando':
                return 'Entrega estimada de até 5 dias úteis'
            case 'A caminho':
                return 'A caminho'
        }
    }

    return (
        <>
            <Head>
                <title>Dunna - Meus pedidos</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Seus pedidos</Title>
                    <Obs>
                        <span>Observação:</span> Se tiver qualquer dúvida ou
                        problema, por favor entre em contato conosco no email
                        nilza.quintao@outlook.com
                    </Obs>
                    <OrdersContainer>
                        {myOrders.length > 0 ? (
                            myOrders.map(order => (
                                <OrderBox key={order._id}>
                                    <OrderHeader>
                                        <DateParagraph>
                                            <span>Data do pedido</span>{' '}
                                            <Moment
                                                local={true}
                                                format="DD/MM/YYYY"
                                            >
                                                {order.createdAt}
                                            </Moment>
                                        </DateParagraph>
                                        <Total>
                                            <span>Total</span>{' '}
                                            {(order.totalAmount / 100).toFixed(
                                                2
                                            )}
                                        </Total>
                                        <UntilDate>
                                            <span>
                                                {order.shipping.status}
                                                {/* {statusHandler(
                                                    order.shipping.status
                                                )} */}
                                            </span>
                                        </UntilDate>
                                    </OrderHeader>
                                    <OrderBody>
                                        <ItensContainer>
                                            <CartItemContainer>
                                                {order.orderItems.map(
                                                    ({ product: item }) => (
                                                        <CartItem
                                                            key={item._id}
                                                        >
                                                            <ImageContainer>
                                                                <Img
                                                                    src={
                                                                        item
                                                                            .images[0]
                                                                            .url
                                                                    }
                                                                    alt="Product Image"
                                                                />
                                                            </ImageContainer>
                                                            <Name>
                                                                {item.name}
                                                            </Name>
                                                            <Price>
                                                                R${' '}
                                                                {(
                                                                    item.price /
                                                                    100
                                                                ).toFixed(2)}
                                                            </Price>
                                                        </CartItem>
                                                    )
                                                )}
                                            </CartItemContainer>
                                        </ItensContainer>
                                        <OrderAddress order={order} />
                                    </OrderBody>
                                </OrderBox>
                            ))
                        ) : (
                            <NoOrders>Você ainda não possui pedidos</NoOrders>
                        )}
                    </OrdersContainer>
                </Container>
            </PageContainer>
        </>
    )
}

orders.getInitialProps = async (ctx, token) => {
    const { data: myOrders } = await axios.get('/orders', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    return { myOrders }
}

export default RequireAuthentication(orders)
