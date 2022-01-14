import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'

import {
    PageContainer,
    Container,
    ActionsTd
} from '../../styles/pages/products'

import Table from '../table'

import ConfirmModal from '../confirmModal'
import Modal from '../modal'
import { Input } from '../input/style'
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
    const [optionName, setOptionName] = useState(null)

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
            const response = await axios.delete(deleteLink + confirmModalId)
            const optionsCopy = [...options]
            optionsCopy.splice(confirmModalRow, 1)
            setOptions(optionsCopy)

            setConfirmModalId(null)
            setShowConfirmModal(false)
        } catch (e) {
            setConfirmModalError(e.response.data.error)
        }
    }

    const createOption = async () => {
        const { data: createdShape } = await axios.post(createLink, {
            name: optionName
        })
        const optionsCopy = [...options]
        optionsCopy.push(createdShape)
        setOptions(optionsCopy)

        setOptionName(null)
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
                <Modal
                    title={title}
                    show={showCreateModal}
                    closeModal={() => setShowCreateModal(false)}
                >
                    <Input onChange={e => setOptionName(e.target.value)} />
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
                            onClick={createOption}
                        >
                            {title}
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

export default productFields
