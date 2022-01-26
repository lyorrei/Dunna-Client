import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Link from 'next/link'

import { User } from '../me'

import ConfirmModal from '../../components/confirmModal'
import PageContainer from '../../components/pageWrapper'
import AddressBox from '../../components/addressBox'

import {
    Title,
    SubContainer,
    NewAddressBox
} from '../../styles/pages/addresses'

import { BiPlus } from 'react-icons/bi'
import RequireAuthentication from '../../HOC/requireAuthentication'

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
    const [confirmModalLoading, setConfirmModalLoading] = useState(false)

    const openConfirmModal = (id: string) => {
        setConfirmModalId(id)
        setShowConfirmModal(true)
    }

    const closeConfirmModal = () => {
        setConfirmModalId(null)
        setShowConfirmModal(false)
        setConfirmModalLoading(false)
    }

    const confirmHandler = async () => {
        setConfirmModalLoading(true)
        await axios.delete('/address/' + confirmModalId)
        const addressCopy = myAddresses.filter(
            address => address._id !== confirmModalId
        )
        setMyAddresses(addressCopy)

        closeConfirmModal()
    }

    return (
        <>
            <Head>
                <title>DUNNA® | Meus endereços</title>
            </Head>
            <PageContainer>
                <Title>Seus endereços</Title>
                <SubContainer>
                    <Link href="/addresses/new">
                        <NewAddressBox>
                            <BiPlus />
                            <p>Adicionar endereço</p>
                        </NewAddressBox>
                    </Link>
                    {myAddresses.map(address => (
                        <AddressBox
                            address={address}
                            user={user}
                            openConfirmModal={openConfirmModal}
                        />
                    ))}
                </SubContainer>
            </PageContainer>
            <ConfirmModal
                title="Tem certeza que deseja excluir?"
                show={showConfirmModal}
                closeModal={closeConfirmModal}
                confirmHandler={confirmHandler}
                obs="Excluir este endereço não excluirá
                pedidos pendentes que estejam sendo enviados para este endereço."
                loading={confirmModalLoading}
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
