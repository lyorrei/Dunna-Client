import React, { useState } from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import axios from '../../../axios'
import RequireAuthentication from '../../HOC/requireAuthentication'

import {
    PageContainer,
    Container,
    Title,
    SubTitle,
    ButtonContainer
} from '../../styles/pages/ordersall/order'
import { CartItemContainer } from '../../components/checkoutCart/style'

import { Order } from '../checkout/success/[orderId]'

import OrderAddress from '../../components/orderAddress'
import OrderPrice from '../../components/orderPrice'
import Modal from '../../components/modal'
import CartItem from '../../components/cartItem'
import OrderUser from '../../components/orderUser'
import Loader from '../../components/loader'
import OrderStatusModal from '../../components/orderStatusModal'
import { InlineButton } from '../../components/button'

interface Props {
    order: Order
}

const orderPage = ({ order: orderFromProps }: Props) => {
    const [order, setOrder] = useState(orderFromProps)
    const [showModal, setShowModal] = useState(false)
    const [status, setStatus] = useState(order.shipping.status)
    const [loading, setLoading] = useState(false)

    const changeStatus = async () => {
        setLoading(true)
        const { data } = await axios.patch(
            '/shipping/edit/' + order.shipping._id,
            { status: status }
        )
        const { data: updatedOrder } = await axios.get('/order/' + order._id)
        setOrder(updatedOrder)
        setShowModal(false)
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Dunna - Produtos</title>
            </Head>
            <PageContainer>
                <Container>
                    <Title>Pedido</Title>

                    <SubTitle>Cliente:</SubTitle>
                    <OrderUser user={order.user} />

                    <SubTitle>Itens do pedido:</SubTitle>
                    <CartItemContainer>
                        {order.orderItems.map(({ product: item }) => (
                            <CartItem product={item} />
                        ))}
                    </CartItemContainer>

                    {order.coupon && (
                        <SubTitle>
                            Cupom:
                            <span>
                                R$ {(order.coupon.value / 100).toFixed(2)}
                            </span>
                        </SubTitle>
                    )}

                    <OrderPrice
                        discountPrice={order.totalAmount}
                        noDiscountPrice={order.totalAmountWithoutCoupon}
                        discount={order.coupon ? true : false}
                        primaryColor
                        next
                    />

                    <SubTitle>Detalhes do endereço:</SubTitle>
                    <OrderAddress additional status order={order} />

                    <ButtonContainer>
                        <InlineButton onClick={() => setShowModal(true)}>
                            Mudar Status
                        </InlineButton>
                    </ButtonContainer>
                </Container>
            </PageContainer>
            <Modal
                title="Mudar Status"
                show={showModal}
                closeModal={() => setShowModal(false)}
            >
                {!loading ? (
                    <OrderStatusModal
                        status={order.shipping.status}
                        changeStatus={changeStatus}
                        setStatus={setStatus}
                    />
                ) : (
                    <Loader />
                )}
            </Modal>
        </>
    )
}

orderPage.getInitialProps = async (context: NextPageContext, token: string) => {
    const { data: order } = await axios.get('/orderadmin/' + context.query.id, {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        order
        // will be passed to the page component as props
    }
}

export default RequireAuthentication(orderPage, true)
