import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'

import CouponCreateModal from '../../components/couponCreateModal'

import {
    PageContainer,
    Container,
    ActionsTd
} from '../../styles/pages/products'

import Table from '../../components/table'

import ConfirmModal from '../../components/confirmModal'
import { InlineButton } from '../../components/button'

import { FaTrash } from 'react-icons/fa'
import RequireAuthentication from '../../HOC/requireAuthentication'
import { NextPageContext } from 'next'
import { CreatePageButtonContainer } from '../../styles/pages/coupons'
import { Badge } from '../../components/badge'

import Moment from 'react-moment'

export interface Coupon {
    name: String
    value: number
    expirable: boolean
    expirable_date: Date
    orderCoupons: []
}

interface Props {
    coupons: Coupon[]
}

const couponsPage = ({ coupons: couponsFromProps }: Props) => {
    const [coupons, setCoupons] = useState(couponsFromProps)
    const [showCreateModal, setShowCreateModal] = useState(false)
    console.log(coupons)
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
            const response = await axios.delete('/coupon/' + confirmModalId)
            const couponsCopy = [...coupons]
            couponsCopy.splice(confirmModalRow, 1)
            setCoupons(couponsCopy)

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
                        Header: 'Nome',
                        accessor: 'name'
                    },
                    {
                        Header: 'Válido apenas uma vez',
                        accessor: 'validOnce',
                        Cell: props => {
                            return (
                                <Badge type="boolean" boolean={props.value}>
                                    {props.value
                                        ? 'Válido apenas uma vez'
                                        : 'Válido multiplas vezes'}
                                </Badge>
                            )
                        }
                    },
                    {
                        Header: 'Expirável',
                        accessor: 'expirable',
                        Cell: props => {
                            return (
                                <Badge type="blueGreen" boolean={props.value}>
                                    {props.value
                                        ? 'Expirável'
                                        : 'Não expirável'}
                                </Badge>
                            )
                        }
                    },

                    {
                        Header: 'Data de expiração',
                        accessor: 'expirableDate',
                        Cell: props => {
                            const expirableDateFormated = new Date(props.value)
                            const now = new Date()
                            const dateBoolean = expirableDateFormated <= now

                            return (
                                <>
                                    {props.value ? (
                                        <>
                                            <Moment
                                                local={true}
                                                format="DD/MM/YYYY"
                                            >
                                                {props.value}
                                            </Moment>
                                            <Badge
                                                style={{
                                                    margin: '0 2rem'
                                                }}
                                                type="boolean"
                                                boolean={dateBoolean}
                                            >
                                                {dateBoolean
                                                    ? 'Expirado'
                                                    : 'Não expirado'}
                                            </Badge>
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </>
                            )
                        }
                    },

                    {
                        Header: 'Valor',
                        accessor: 'value',
                        Cell: props => (
                            <span>R$ {(props.value / 100).toFixed(2)}</span>
                        )
                    },
                    {
                        Header: 'Mínimo valor da compra',
                        accessor: 'cartMinValue',
                        Cell: props => (
                            <span>R$ {(props.value / 100).toFixed(2)}</span>
                        )
                    },
                    {
                        Header: 'Vezes utilizado',
                        accessor: 'orderCoupons',
                        Cell: props => (
                            <span>
                                {props.value ? props.value.length : '0'}
                            </span>
                        )
                    },

                    {
                        Header: 'Ações',
                        accessor: '_id',
                        Cell: props => (
                            <ActionsTd>
                                <FaTrash
                                    onClick={() =>
                                        openConfirmModal(
                                            props.value,
                                            props.row.index
                                        )
                                    }
                                />
                            </ActionsTd>
                        )
                    }
                ]
            }
        ],
        [coupons]
    )

    const data = React.useMemo(() => [...coupons], [coupons])

    return (
        <>
            <Head>
                <title>Dunna - Cupons</title>
            </Head>
            <PageContainer>
                <Container>
                    <CreatePageButtonContainer>
                        <InlineButton onClick={() => setShowCreateModal(true)}>
                            Criar cupom
                        </InlineButton>
                    </CreatePageButtonContainer>
                    <Table columns={columns} data={data} />
                </Container>

                <CouponCreateModal
                    coupons={coupons}
                    setCoupons={setCoupons}
                    showModal={showCreateModal}
                    setShowModal={setShowCreateModal}
                />

                <ConfirmModal
                    title="Tem certeza que deseja excluir?"
                    show={showConfirmModal}
                    closeModal={closeConfirmModal}
                    confirmHandler={handleDelete}
                    error={confirmModalError}
                />
            </PageContainer>
        </>
    )
}

couponsPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: coupons } = await axios.get('/coupons', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        coupons

        // will be passed to the page component as props
    }
}

export default RequireAuthentication(couponsPage, true)
