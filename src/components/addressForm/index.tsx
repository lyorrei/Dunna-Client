import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'
import axios from '../../../axios'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { InlineButton } from '../button'
import Input from '../input'
import { Container, Form, PageContainer, SideBySide, Title } from './style'
import { Address } from '../../pages/addresses'

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

interface Props {
    submitLink: string
    submitType: string
    title: string
    formInitialData?: Address
}

const addressForm: React.FC<Props> = ({
    submitLink,
    submitType,
    formInitialData,
    title
}) => {
    const [formError, setFormError] = useState(null)
    const formRef = useRef<FormHandles>(null)
    const [loading, setLoading] = useState(false)

    const Router = useRouter()

    const handleSubmit: SubmitHandler<FormData> = async formData => {
        try {
            // Remove all previous errors
            setFormError(null)
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                city: Yup.string().required('A cidade é obrigatória'),
                state: Yup.string().required('O estado é obrigatório'),
                street: Yup.string().required('A rua é obrigatória'),
                number: Yup.number()
                    .typeError('Você deve escrever um número')
                    .required('O número é obrigatório'),
                zip: Yup.number()
                    .typeError('Você deve escrever um número')
                    .required('O CEP é obrigatório'),
                additional_info: Yup.string(),
                phone: Yup.number()
                    .typeError('Você deve escrever um número')
                    .required('O telefone é obrigatório')
            })
            await schema.validate(formData, {
                abortEarly: false
            })

            // Validation passed
            setLoading(true)
            if (submitType === 'post') {
                await axios.post(submitLink, formData)
            } else if (submitType === 'patch') {
                await axios.patch(submitLink, formData)
            }
            Router.back()
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
        <PageContainer
            variants={pageContainerVariant}
            initial="hidden"
            animate="visible"
        >
            <Container>
                <Title>{title}</Title>
                <Form
                    loading={loading ? 1 : 0}
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={formInitialData}
                >
                    {submitType === 'patch' && <p>
                        <strong>Observação:</strong> Editar este endereço não editará pedidos
                        pendentes que estejam sendo enviados para este endereço.
                    </p>}
                    <Input name="state" label="Estado" />
                    <Input name="city" label="Cidade" />
                    <Input name="street" label="Rua" />
                    <Input name="number" type="number" label="Número" />
                    <Input
                        name="additional_info"
                        label="Complemento (opcional)"
                    />
                    <SideBySide>
                        <Input name="zip" type="number" label="CEP" />
                        <Input name="phone" type="number" label="Telefone" />
                    </SideBySide>

                    <InlineButton type="submit">{title}</InlineButton>
                </Form>

                {loading && (
                    <div style={{ margin: '12rem auto', width: '120px' }}>
                        <ClipLoader color={'#00c2a8'} size={120} />
                    </div>
                )}
            </Container>
        </PageContainer>
    )
}

export default addressForm
