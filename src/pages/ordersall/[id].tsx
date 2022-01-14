import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import RequireAuthentication from '../../HOC/requireAuthentication'

import {
    PageContainer,
    Container,
    Title,
    CartItem,
    CartItemContainer,
    ImageContainer,
    Img,
    Name,
    Price,
    SubTitle,
    Paragraph,
    UserContainer,
    ButtonContainer
} from '../../styles/pages/ordersall/order'

import { NextPageContext } from 'next'

import OrderAddress from '../../components/orderAddress'
import { Order } from '../checkout/success/[orderId]'
import { InlineButton } from '../../components/button'
import Modal from '../../components/modal'
import { Input } from '../../components/input/style'
import { ClipLoader } from 'react-spinners'
import OrderPrice from '../../components/orderPrice'

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
                    <UserContainer>
                        <Paragraph>
                            <span>Nome:</span>
                            {order.user.firstName} {order.user.lastName}
                        </Paragraph>
                        <Paragraph>
                            <span>Email:</span>
                            {order.user.email}
                        </Paragraph>
                    </UserContainer>

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
                    <>
                        <Input
                            defaultValue={order.shipping.status}
                            onChange={e => setStatus(e.target.value)}
                        />
                        <div
                            style={{
                                marginTop: '2rem',
                                width: '40%',
                                float: 'right'
                            }}
                        >
                            <InlineButton onClick={() => changeStatus()}>
                                Mudar
                            </InlineButton>
                        </div>
                    </>
                ) : (
                    <div style={{ margin: '12rem auto', width: '120px' }}>
                        <ClipLoader color={'#00c2a8'} size={120} />
                    </div>
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
