import React, { useEffect, useRef, useState } from 'react'
import axios from '../../axios'
import * as Yup from 'yup'

import Head from 'next/head'
import Link from 'next/link'

import RequireAuthentication from '../HOC/requireAuthentication'
import {
    PageContainer,
    Container,
    Title,
    SubContainer,
    IsLoading
} from '../styles/pages/me'

import Button, { InlineButton } from '../components/button'

import HashLoader from 'react-spinners/HashLoader'
import Modal from '../components/modal'
import Input from '../components/input'
import Form from '../components/form'
import UserForm from '../components/userForm'
import { SubmitHandler } from '@unform/core'
import { useUser } from '../context/User'
import Alert, { Types } from '../components/alert'
import CircleLoader from 'react-spinners/CircleLoader'

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

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
}

interface Props {
    user: User
}

const itemsArray = (user: User) => {
    return [
        {
            label: 'Primeiro nome',
            fieldName: 'firstName',
            modalTitle: 'Editar o primeiro nome',
            fieldValue: user.firstName,
            inputType: 'text'
        },
        {
            label: 'Último nome',
            fieldName: 'lastName',
            modalTitle: 'Editar o último nome',
            fieldValue: user.lastName,
            inputType: 'text'
        },
        {
            label: 'Email',
            fieldName: 'email',
            modalTitle: 'Editar o email',
            fieldValue: user.email,
            inputType: 'email'
        },
        {
            label: 'Senha',
            fieldName: 'password',
            modalTitle: 'Digite a nova senha',
            fieldValue: '',
            inputType: 'password'
        }
    ]
}

const me: React.FC<Props> = () => {
    const { user, setUser } = useUser()

    const [items, setItems] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState(null)
    const [modalLabel, setModalLabel] = useState(null)
    const [modalField, setModalField] = useState(null)
    const [modalFieldDefaultValue, setModalFieldDefaultValue] = useState(null)
    const [modalInputType, setModalInputType] = useState(null)
    const [loading, setLoading] = useState(false)
    const [initialData, setInitialData] = useState({})
    const [formError, setFormError] = useState(null)

    const formRef = useRef(null)

    useEffect(() => {
        const defaultForm = {}
        defaultForm[modalField] = modalFieldDefaultValue
        setInitialData(defaultForm)
    }, [modalField, modalFieldDefaultValue])

    useEffect(() => {
        if (user) {
            setItems(itemsArray(user))
        }
    }, [user])

    const openModal = (
        label: string,
        field: string,
        modalTitle: string,
        defaultValue: string,
        inputType: string
    ) => {
        setShowModal(true)
        setModalTitle(modalTitle)
        setModalLabel(label)
        setModalField(field)
        setModalFieldDefaultValue(defaultValue)
        setModalInputType(inputType)
    }

    const closeModal = () => {
        setShowModal(false)
        setModalTitle(null)
        setModalLabel(null)
        setModalField(null)
        setModalFieldDefaultValue(null)
        setModalInputType(null)
        setFormError(null)
        setLoading(false)
    }

    const handleSubmit: SubmitHandler<FormData> = async formData => {
        try {
            // Remove all previous errors
            formRef.current.setErrors({})
            setFormError(null)

            let schema = null

            switch (modalField) {
                case 'email':
                    schema = Yup.object().shape({
                        email: Yup.string()
                            .email('Digite um e-mail válido')
                            .required('O e-mail é obrigatório')
                    })
                    break
                case 'password':
                    schema = Yup.object().shape({
                        password: Yup.string()
                            .min(7, 'No mínimo 7 caracteres')
                            .required('A senha é obrigatória')
                    })
                    break
                case 'firstName':
                    schema = Yup.object().shape({
                        firstName: Yup.string().required(
                            'O primeiro nome é obrigatório'
                        )
                    })
                    break
                case 'lastName':
                    schema = Yup.object().shape({
                        lastName: Yup.string().required(
                            'O último nome é obrigatório'
                        )
                    })
                    break
            }

            await schema.validate(formData, {
                abortEarly: false
            })

            // Validation passed
            setLoading(true)
            const { data } = await axios.patch('/users/me', formData)
            setUser(data)
            closeModal()
        } catch (err) {
            const validationErrors = {}
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })
                formRef.current.setErrors(validationErrors)
            } else {
                setFormError(err.response.data.error)
                setLoading(false)
            }
        }
    }

    return (
        <>
            <Head>
                <title>Dunna - Minha conta</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Minhas informações</Title>
                    <SubContainer>
                        {user ? (
                            items.map(item => (
                                <UserForm
                                    key={item.fieldName}
                                    fieldName={item.fieldName}
                                    fieldValue={item.fieldValue}
                                    label={item.label}
                                    modalTitle={item.modalTitle}
                                    inputType={item.inputType}
                                    submitHandler={openModal}
                                />
                            ))
                        ) : (
                            <div
                                style={{ margin: '4rem auto', width: '100px' }}
                            >
                                <HashLoader color={'#00c2a8'} size={100} />
                            </div>
                        )}
                    </SubContainer>
                    <Link href="/myaccount">
                        <InlineButton>Concluído</InlineButton>
                    </Link>
                </Container>
            </PageContainer>
            <Modal title={modalTitle} show={showModal} closeModal={closeModal}>
                <IsLoading loading={loading ? 1 : 0}>
                    <Form
                        onSubmit={handleSubmit}
                        ref={formRef}
                        initialData={initialData}
                    >
                        {formError && (
                            <Alert type={Types.red}>{formError}</Alert>
                        )}
                        <Input
                            name={modalField}
                            label={modalLabel}
                            type={modalInputType}
                        />
                        <Button type="submit">Editar</Button>
                    </Form>
                </IsLoading>
                {loading && (
                    <div style={{ margin: '4rem auto', width: '120px' }}>
                        <CircleLoader color={'#00c2a8'} size={120} />
                    </div>
                )}
            </Modal>
        </>
    )
}

export default RequireAuthentication(me)
