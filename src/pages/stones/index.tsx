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
    stones: StonesAndShapes[]
}

const stonesPage = ({ stones: stonesFromProps }: Props) => {
    const [stones, setStones] = useState(stonesFromProps)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [stoneName, setStoneName] = useState(null)

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
            const response = await axios.delete('/stone/' + confirmModalId)
            const stonesCopy = [...stones]
            stonesCopy.splice(confirmModalRow, 1)
            setStones(stonesCopy)

            setConfirmModalId(null)
            setShowConfirmModal(false)
        } catch (e) {
            setConfirmModalError(e.response.data.error)
        }
    }

    const createStone = async () => {
        const { data: createdStone } = await axios.post('/stones/create', {
            name: stoneName
        })
        const stonesCopy = [...stones]
        stonesCopy.push(createdStone)
        setStones(stonesCopy)

        setStoneName(null)
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
                                {/* <Link href={'/products/images/' + props.value}>
                                    <a className="imgg">
                                        <BsImageFill fill="green" />
                                    </a>
                                </Link>
                                <Link href={'/products/edit/' + props.value}>
                                    <a>
                                        <MdEdit />
                                    </a>
                                </Link> */}

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
        [stones]
    )

    const data = React.useMemo(() => [...stones], [stones])

    return (
        <>
            <Head>
                <title>Dunna - Stones</title>
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
                            Criar Pedra
                        </InlineButton>
                    </div>
                    <Table columns={columns} data={data} />
                </Container>
                <Modal
                    title="Criar Pedra"
                    show={showCreateModal}
                    closeModal={() => setShowCreateModal(false)}
                >
                    <Input onChange={e => setStoneName(e.target.value)} />
                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <InlineButton
                            style={{
                                width: '30%'
                            }}
                            onClick={createStone}
                        >
                            Criar Pedra
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

stonesPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: stones } = await axios.get('/stones', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        stones

        // will be passed to the page component as props
    }
}

export default RequireAuthentication(stonesPage, true)
