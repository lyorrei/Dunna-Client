import React, { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import RequireAuthentication from '../HOC/requireAuthentication'
import { Title, SubContainer } from '../styles/pages/me'

import { InlineButton } from '../components/button'

import UserForm from '../components/userForm'

import PageContainers from '../components/pageContainers'
import Loader from '../components/loader'
import MeModal from '../components/meModal'

import { useUser } from '../context/User'
import { useCart } from '../context/Cart'

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
}

interface Props {
    user: User
}

const me: React.FC<Props> = () => {
    const { user, handleLogout } = useUser()
    const { setCart, setTempProduct } = useCart()

    const [modalLabel, setModalLabel] = useState(null)
    const [modalField, setModalField] = useState(null)
    const [modalFieldDefaultValue, setModalFieldDefaultValue] = useState(null)
    const [modalInputType, setModalInputType] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState(null)

    const openModal = (
        label: string,
        field: string,
        defaultValue: string,
        inputType: string
    ) => {
        setShowModal(true)
        setModalLabel(label)
        setModalField(field)
        setModalFieldDefaultValue(defaultValue)
        setModalInputType(inputType)
    }

    const closeModal = () => {
        setShowModal(false)
        setModalLabel(null)
        setModalField(null)
        setModalFieldDefaultValue(null)
        setModalInputType(null)
        setFormError(null)
        setLoading(false)
    }

    const items = React.useMemo(
        () => [
            {
                label: 'Primeiro nome',
                fieldName: 'firstName',
                fieldValue: user ? user.firstName : null,
                inputType: 'text',
                handler: () => {
                    openModal(
                        'Primeiro nome',
                        'firstName',
                        user ? user.firstName : null,
                        'text'
                    )
                }
            },
            {
                label: 'Último nome',
                fieldName: 'lastName',
                fieldValue: user ? user.lastName : null,
                inputType: 'text',
                handler: () => {
                    openModal(
                        'Último nome',
                        'lastName',
                        user ? user.lastName : null,
                        'text'
                    )
                }
            },
            {
                label: 'Senha',
                fieldValue: '********',
                handler: () => {
                    setCart([])
                    setTempProduct(null)
                    handleLogout('/recovery/password')
                }
            }
        ],
        [user]
    )

    return (
        <>
            <Head>
                <title>DUNNA® | Minha conta</title>
            </Head>
            <PageContainers>
                <Title>Minhas informações</Title>
                <SubContainer>
                    {user ? (
                        <>
                            {items.map(item => (
                                <UserForm key={item.fieldName} item={item} />
                            ))}
                        </>
                    ) : (
                        <Loader />
                    )}
                </SubContainer>
                <Link href="/myaccount">
                    <InlineButton>Concluído</InlineButton>
                </Link>
            </PageContainers>
            <MeModal
                closeModal={closeModal}
                field={modalField}
                inputType={modalInputType}
                label={modalLabel}
                showModal={showModal}
                inputDefaultValue={modalFieldDefaultValue}
                loading={loading}
                setLoading={setLoading}
                formError={formError}
                setFormError={setFormError}
            />
        </>
    )
}

export default RequireAuthentication(me)
