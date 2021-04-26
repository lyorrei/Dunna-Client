import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import RequireAuthentication from '../../HOC/requireAuthentication'

import {
    PageContainer,
    Container,
    ActionsTd
} from '../../styles/pages/ordersall'

import Table from '../../components/table'
import { NextPageContext } from 'next'
import product, { ImageProduct } from '../../components/product'
import { StonesAndShapes } from '../shop/products'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import ConfirmModal from '../../components/confirmModal'
import { BsImageFill } from 'react-icons/bs'

import { Product } from '../products'
import { Address } from '../addresses'
import { AiFillEye } from 'react-icons/ai'

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
    const [orders, setOrders] = useState(ordersFromProps)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalId, setConfirmModalId] = useState(null)
    const [confirmModalRow, setConfirmModalRow] = useState(null)
    const [confirmModalError, setConfirmModalError] = useState(null)

    const openConfirmModal = (id: string, row) => {
        setConfirmModalId(id)
        setShowConfirmModal(true)
        setConfirmModalRow(row)
    }

    const closeConfirmModal = () => {
        setConfirmModalId(null)
        setShowConfirmModal(false)
        setConfirmModalError(null)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete('/product/' + confirmModalId)
            const ordersCopy = [...orders]
            ordersCopy.splice(confirmModalRow, 1)
            setOrders(ordersCopy)

            setConfirmModalId(null)
            setShowConfirmModal(false)
        } catch (e) {
            setConfirmModalError(e.response.data.error)
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Data do pedido',
                        accessor: 'createdAt',
                        Cell: props => {
                            const date = new Date(props.value)
                            const year = date.getFullYear()
                            let month: number | string = date.getMonth() + 1
                            let dt: number | string = date.getDate()

                            if (dt < 10) {
                                dt = '0' + dt
                            }
                            if (month < 10) {
                                month = '0' + month
                            }

                            return (
                                <span>
                                    {dt}/{month}/{year}
                                </span>
                            )
                        }
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
                        Cell: props => (
                            <ActionsTd>
                                <Link href={'/ordersall/' + props.value}>
                                    <a>
                                        <AiFillEye />
                                    </a>
                                </Link>

                            </ActionsTd>
                        )
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
