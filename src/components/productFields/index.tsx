import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'

import { PageContainer, Container } from '../../styles/pages/products'

import Table from '../table'

import ConfirmModal from '../confirmModal'
import ActionsTd from '../actionsTd'
import ProductFieldsModal from '../productFieldsModal'
import { InlineButton } from '../button'

import { FaTrash } from 'react-icons/fa'
import { StonesAndShapes } from '../../pages/shop/[type]'
import { CreateButtonContainer } from './style'

interface Props {
    options: StonesAndShapes[]
    createLink: string
    deleteLink: string
    title: string
}

const productFields = ({
    options: optionsFromProps,
    createLink,
    deleteLink,
    title
}: Props) => {
    const [options, setOptions] = useState(optionsFromProps)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalId, setConfirmModalId] = useState(null)
    const [confirmModalRow, setConfirmModalRow] = useState(null)
    const [confirmModalError, setConfirmModalError] = useState(null)
    const [confirmModalLoading, setConfirmModalLoading] = useState(false)

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
            const response = await axios.delete(deleteLink + confirmModalId)
            const optionsCopy = [...options]
            optionsCopy.splice(confirmModalRow, 1)
            setOptions(optionsCopy)

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
                        Header: 'Nome',
                        accessor: 'name'
                    },

                    {
                        Header: 'Ações',
                        accessor: '_id',
                        Cell: props => {
                            const actions = [
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
        [options]
    )

    const data = React.useMemo(() => [...options], [options])

    return (
        <>
            <Head>
                <title>Dunna - Options</title>
            </Head>
            <PageContainer>
                <Container>
                    <CreateButtonContainer>
                        <InlineButton onClick={() => setShowCreateModal(true)}>
                            {title}
                        </InlineButton>
                    </CreateButtonContainer>
                    <Table columns={columns} data={data} />
                </Container>
                <ProductFieldsModal
                    createLink={createLink}
                    options={options}
                    setOptions={setOptions}
                    title={title}
                    setShowModal={setShowCreateModal}
                    showModal={showCreateModal}
                />

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

export default productFields
