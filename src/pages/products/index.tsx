import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import RequireAuthentication from '../../HOC/requireAuthentication'

import { PageContainer, Container } from '../../styles/pages/products'

import Table from '../../components/table'
import { NextPageContext } from 'next'
import { ImageProduct } from '../../components/product'
import { StonesAndShapes } from '../shop/[type]'
import { MdEdit } from 'react-icons/md'
import { FaRegEye, FaTrash } from 'react-icons/fa'
import ConfirmModal from '../../components/confirmModal'
import { BsImageFill } from 'react-icons/bs'
import { Badge } from '../../components/badge'

import ActionsTd from '../../components/actionsTd'

export interface Product {
    sold: boolean
    _id: string
    productType: StonesAndShapes
    type: StonesAndShapes
    stock_id: number
    name: string
    description: string
    price: number
    stone: StonesAndShapes
    stoneWeigth: number
    diamondWeigth: number
    shape: StonesAndShapes
    images: ImageProduct[]
    metal: StonesAndShapes
    visible: boolean
    notBuyable: boolean
}

interface Props {
    products: Product[]
}

const productsPage = ({ products: productsFromProps }: Props) => {
    const [products, setProducts] = useState(productsFromProps)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalId, setConfirmModalId] = useState(null)
    const [confirmModalRow, setConfirmModalRow] = useState(null)
    const [confirmModalError, setConfirmModalError] = useState(null)
    const [confirmModalLoading, setConfirmModalLoading] = useState(null)


    const openConfirmModal = (id: string, row) => {
        setConfirmModalId(id)
        setShowConfirmModal(true)
        setConfirmModalRow(row)
    }

    const closeConfirmModal = () => {
        setConfirmModalId(null)
        setShowConfirmModal(false)
        setConfirmModalError(null)
        setConfirmModalLoading(false)
    }

    const handleDelete = async () => {
        try {
            setConfirmModalLoading(true)
            const response = await axios.delete('/product/' + confirmModalId)
            const productsCopy = [...products]
            productsCopy.splice(confirmModalRow, 1)
            setProducts(productsCopy)

            closeConfirmModal()
        } catch (e) {
            setConfirmModalError(e.response.data.error)
            setConfirmModalLoading(false)
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Id do Estoque',
                        accessor: 'stock_id'
                    },
                    {
                        Header: 'Status',
                        accessor: 'sold',
                        Cell: props => (
                            <Badge type="sold" sold={props.value}>
                                {props.value ? 'Vendido' : 'Em estoque'}
                            </Badge>
                        )
                    },
                    {
                        Header: 'Visível',
                        accessor: 'visible',
                        Cell: props => {
                            return (
                                <Badge type="visible" visible={props.value}>
                                    {props.value ? 'Visível' : 'Escondido'}
                                </Badge>
                            )
                        }
                    },
                    {
                        Header: 'Sob Consulta',
                        accessor: 'notBuyable',
                        Cell: props => (
                            <Badge type="notBuyable" notBuyable={props.value}>
                                {props.value ? 'Sob consulta' : 'Sem consulta'}
                            </Badge>
                        )
                    },
                    {
                        Header: 'Tipo',
                        accessor: 'type.name'
                    },
                    {
                        Header: 'Nome',
                        accessor: 'name'
                    },
                    {
                        Header: 'Preço',
                        accessor: 'price',
                        Cell: props => (
                            <span>R$ {(props.value / 100).toFixed(2)}</span>
                        )
                    },
                    {
                        Header: 'Pedra',
                        accessor: 'stone.name'
                    },
                    {
                        Header: 'Ações',
                        accessor: '_id',
                        Cell: props => {
                            const actions = [
                                {
                                    link: '/shop/product/' + props.value,
                                    icon: FaRegEye,
                                    color: 'cyan'
                                },
                                {
                                    link: '/products/images/' + props.value,
                                    icon: BsImageFill,
                                    color: 'green'
                                },
                                {
                                    link: '/products/edit/' + props.value,
                                    icon: MdEdit,
                                    color: '#c4bf29'
                                },
                                {
                                    handler: () =>
                                        openConfirmModal(
                                            props.value,
                                            props.row.index
                                        ),
                                    icon: FaTrash,
                                    color: 'red'
                                }
                            ]

                            return <ActionsTd actions={actions} />
                        }
                    }
                ]
            }
        ],
        [products]
    )

    const data = React.useMemo(() => [...products], [products])

    return (
        <>
            <Head>
                <title>Dunna - Produtos</title>
            </Head>
            <PageContainer>
                <Container>
                    <Table columns={columns} data={data} />
                </Container>
                <ConfirmModal
                    title="Tem certeza que deseja excluir?"
                    show={showConfirmModal}
                    closeModal={closeConfirmModal}
                    confirmHandler={handleDelete}
                    error={confirmModalError}
                    loading={confirmModalLoading}
                />
            </PageContainer>
        </>
    )
}

productsPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: products } = await axios.get('/productsall', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        products
    }
}

export default RequireAuthentication(productsPage, true)
