import React, { useRef, useState } from 'react'
import axios from '../../../axios'
import * as Yup from 'yup'

import { SubmitHandler, FormHandles } from '@unform/core'
import Input from '../input'

import Button from '../button'
import { InputGroup, SignupTitle } from './style'
import Form from '../form'

import Alert, { Types } from '../alert'

interface Props {
    setLoading(boolean: boolean): void
}

const signupForm: React.FC<Props> = ({ setLoading }) => {
    const [formSuccess, setFormSuccess] = useState(null)
    const [formError, setFormError] = useState(null)
    const formRef = useRef<FormHandles>(null)

    const handleSubmit: SubmitHandler<FormData> = async data => {
        try {
            // Remove all previous errors
            setFormSuccess(null)
            setFormError(null)
            formRef.current.setErrors({})

            const schema = Yup.object().shape({
                firstName: Yup.string().required(
                    'O primeiro nome é obrigatório'
                ),
                lastName: Yup.string().required('O último nome é obrigatório'),
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('O e-mail é obrigatório'),
                password: Yup.string()
                    .min(7, 'No mínimo 7 caracteres')
                    .required('A senha é obrigatória')
            })
            await schema.validate(data, {
                abortEarly: false
            })

            // Validation passed
            setLoading(true)
            await axios.post('/users/create', data)

            setFormSuccess(
                'Por favor, clique no link enviado ao seu email para confirmar a sua conta (favor checar sua caixa de Spam)'
            )
            formRef.current.reset()
            setLoading(false)
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
                setFormSuccess(null)
            }
        }
    }

    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
            <SignupTitle>
                Cadastre-se e conheça a sutileza sofisticada da Coleção Dunna!
            </SignupTitle>

            {formSuccess && <Alert type={Types.green}>{formSuccess}</Alert>}
            {formError && <Alert type={Types.red}>{formError}</Alert>}

            <InputGroup>
                <Input name="firstName" label="Primeiro nome" />
                <Input name="lastName" label="Último nome" />
            </InputGroup>

            <Input name="email" label="Email" type="email" />
            <Input name="password" label="Senha" type="password" />

            <span>
                Ao clicar em criar conta você concorda com nossa{' '}
                <a
                    href="/pdfs/terms.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    política de privacidade.
                </a>
            </span>

            <Button type="submit">Criar conta</Button>
        </Form>
    )
}

export default signupForm
