import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Link from 'next/link'

import { User } from '../me'

import ConfirmModal from '../../components/confirmModal'

import {
    PageContainer,
    Container,
    Title,
    SubContainer,
    AddressBox,
    NewAddressBox,
    EditIcon,
    TrashIcon
} from '../../styles/pages/addresses'

import { BiPlus } from 'react-icons/bi'
import RequireAuthentication from '../../HOC/requireAuthentication'

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

export interface Address {
    _id: string
    city: string
    state: string
    street: string
    number: number
    zip: number
    additional_info?: string
    phone: number
}

interface Props {
    myAddresses: Address[]
    user: User
}

const addresses = ({ myAddresses: addressFromServer, user }: Props) => {
    const [myAddresses, setMyAddresses] = useState(addressFromServer)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalId, setConfirmModalId] = useState(null)

    const openConfirmModal = (id: string) => {
        setConfirmModalId(id)
        setShowConfirmModal(true)
    }

    const closeConfirmModal = () => {
        setConfirmModalId(null)
        setShowConfirmModal(false)
    }

    const confirmHandler = async () => {
        await axios.delete('/address/' + confirmModalId)
        const addressCopy = myAddresses.filter(
            address => address._id !== confirmModalId
        )
        setMyAddresses(addressCopy)
        setShowConfirmModal(false)
    }

    return (
        <>
            <Head>
                <title>Dunna - Meus endereços</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Seus endereços</Title>
                    <SubContainer>
                        <Link href="/addresses/new">
                            <NewAddressBox>
                                <BiPlus />
                                <p>Adicionar endereço</p>
                            </NewAddressBox>
                        </Link>
                        {myAddresses.map(address => (
                            <AddressBox key={address._id}>
                                <p>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p>
                                    {address.street} {address.number}
                                </p>
                                <p>{address.city}</p>
                                <p>{address.state}</p>
                                {address.additional_info && (
                                    <p>{address.additional_info}</p>
                                )}
                                <p>
                                    <span>CEP:</span> {address.zip}
                                </p>

                                <p>
                                    <span>Telefone:</span> {address.phone}
                                </p>
                                <div>
                                    <Link
                                        href={'/addresses/edit/' + address._id}
                                    >
                                        <a>
                                            <EditIcon />
                                        </a>
                                    </Link>
                                    <TrashIcon
                                        onClick={() =>
                                            openConfirmModal(address._id)
                                        }
                                    />
                                </div>
                            </AddressBox>
                        ))}
                    </SubContainer>
                </Container>
            </PageContainer>
            <ConfirmModal
                title="Tem certeza que deseja excluir?"
                show={showConfirmModal}
                closeModal={closeConfirmModal}
                confirmHandler={confirmHandler}
                obs="Excluir este endereço não excluirá
                pedidos pendentes que estejam sendo enviados para este endereço."
            />
        </>
    )
}

addresses.getInitialProps = async (ctx, token) => {
    const { data: myAddresses } = await axios.get('/addresses', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    return { myAddresses }
}

export default RequireAuthentication(addresses)
