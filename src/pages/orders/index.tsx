import React from 'react'
import axios from '../../../axios'

import Head from 'next/head'

import OrderBox from '../../components/orderBox'

import {
    PageContainer,
    Container,
    Title,
    OrdersContainer,
    Obs,
    NoOrders
} from '../../styles/pages/orders'

import RequireAuthentication from '../../HOC/requireAuthentication'
import { Order } from '../checkout/success/[orderId]'

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
    let orders: JSX.Element | JSX.Element[] = (
        <NoOrders>Você ainda não possui pedidos</NoOrders>
    )

    if (myOrders.length > 0) {
        orders = myOrders.map(order => (
            <OrderBox key={order._id} order={order} />
        ))
    }

    return (
        <>
            <Head>
                <title>DUNNA® | Meus pedidos</title>
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
                        matheus@dunnajw.com
                    </Obs>
                    <OrdersContainer>{orders}</OrdersContainer>
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
