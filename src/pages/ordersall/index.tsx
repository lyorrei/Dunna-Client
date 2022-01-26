import React, { useState } from 'react'
import Head from 'next/head'
import { NextPageContext } from 'next'

import axios from '../../../axios'
import RequireAuthentication from '../../HOC/requireAuthentication'


import { PageContainer, Container } from '../../styles/pages/ordersall'

import Table from '../../components/table'
import Moment from 'react-moment'
import { AiFillEye } from 'react-icons/ai'

import { Product } from '../products'
import { Address } from '../addresses'
import ActionsTd from '../../components/actionsTd'

export interface Order {
    _id: string
    user: {
        admin: boolean
        _id: string
        firstName: string
        lastName: string
        email: string
    }
    totalAmount: number
    shipping: {
        ship_charge: number
        _id: string
        order_address: Address
        status: string
    }
    createdAt: Date
    orderItems: [
        {
            _id: string
            order: string
            product: Product[]
        }
    ]
}

interface Props {
    orders: Order[]
}

const ordersAllPage = ({ orders: ordersFromProps }: Props) => {
    const [orders] = useState(ordersFromProps)

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Data do pedido',
                        accessor: 'createdAt',
                        Cell: props => (
                            <Moment local={true} format="DD/MM/YYYY">
                                {props.value}
                            </Moment>
                        )
                    },
                    {
                        Header: 'Cliente',
                        accessor: 'user.firstName',
                        Cell: props => (
                            <span>
                                {props.row.original.user.firstName}{' '}
                                {props.row.original.user.lastName}
                            </span>
                        )
                    },
                    {
                        Header: 'Email',
                        accessor: 'user.email'
                    },

                    {
                        Header: 'Total',
                        accessor: 'totalAmount',
                        Cell: props => (
                            <span>R$ {(props.value / 100).toFixed(2)}</span>
                        )
                    },
                    {
                        Header: 'Status',
                        accessor: 'shipping.status'
                    },

                    {
                        Header: 'Cidade',
                        accessor: 'shipping.order_address.city'
                    },

                    {
                        Header: 'Ações',
                        accessor: '_id',
                        Cell: props => {
                            const actions = [
                                {
                                    link: '/ordersall/' + props.value,
                                    icon: AiFillEye,
                                    color: 'cyan'
                                }
                            ]
                            return <ActionsTd actions={actions} />
                        }
                    }
                ]
            }
        ],
        [orders]
    )

    const data = React.useMemo(() => [...orders], [orders])

    return (
        <>
            <Head>
                <title>Dunna - Orders</title>
            </Head>
            <PageContainer>
                <Container>
                    <Table columns={columns} data={data} />
                </Container>
            </PageContainer>
        </>
    )
}

ordersAllPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: orders } = await axios.get('/ordersall', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        orders
        // will be passed to the page component as props
    }
}

export default RequireAuthentication(ordersAllPage, true)
