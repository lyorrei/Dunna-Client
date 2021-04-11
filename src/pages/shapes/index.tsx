import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import { NextPageContext } from 'next'
import RequireAuthentication from '../../HOC/requireAuthentication'

import {
    PageContainer,
    Container,
    ActionsTd
} from '../../styles/pages/products'

import Table from '../../components/table'

import { StonesAndShapes } from '../shop'
import ConfirmModal from '../../components/confirmModal'
import Modal from '../../components/modal'
import { Input } from '../../components/input/style'
import { InlineButton } from '../../components/button'

import { FaTrash } from 'react-icons/fa'

interface Props {
    shapes: StonesAndShapes[]
}

const shapesPage = ({ shapes: shapesFromProps }: Props) => {
    const [shapes, setShapes] = useState(shapesFromProps)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [shapeName, setShapeName] = useState(null)

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
            const response = await axios.delete('/shape/' + confirmModalId)
            const shapesCopy = [...shapes]
            shapesCopy.splice(confirmModalRow, 1)
            setShapes(shapesCopy)

            setConfirmModalId(null)
            setShowConfirmModal(false)
        } catch (e) {
            setConfirmModalError(e.response.data.error)
        }
    }

    const createShape = async () => {
        const { data: createdShape } = await axios.post('/shapes/create', {
            name: shapeName
        })
        const shapesCopy = [...shapes]
        shapesCopy.push(createdShape)
        setShapes(shapesCopy)

        setShapeName(null)
        setShowCreateModal(false)
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
        [shapes]
    )

    const data = React.useMemo(() => [...shapes], [shapes])

    return (
        <>
            <Head>
                <title>Dunna - Shapes</title>
            </Head>
            <PageContainer>
                <Container>
                    <div
                        style={{
                            margin: '2rem 0',
                            width: '15%',
                            float: 'right'
                        }}
                    >
                        <InlineButton onClick={() => setShowCreateModal(true)}>
                            Criar Formato
                        </InlineButton>
                    </div>
                    <Table columns={columns} data={data} />
                </Container>
                <Modal
                    title="Criar Formato"
                    show={showCreateModal}
                    closeModal={() => setShowCreateModal(false)}
                >
                    <Input onChange={e => setShapeName(e.target.value)} />
                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <InlineButton
                            style={{
                                width: '50%'
                            }}
                            onClick={createShape}
                        >
                            Criar Formato
                        </InlineButton>
                    </div>
                </Modal>
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

shapesPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: shapes } = await axios.get('/shapes', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        shapes

        // will be passed to the page component as props
    }
}

export default RequireAuthentication(shapesPage, true)
