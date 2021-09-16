import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../axios'
import * as Yup from 'yup'

import { SubmitHandler, FormHandles } from '@unform/core'
import Input from '../input'

import Button from '../button'
import { InputGroup } from './style'
import Form from '../form'

import Router from 'next/router'
import Alert from '../alert/style'
import { Types } from '../alert'
import { useUser } from '../../context/User'

interface Props {
    setLoading(boolean: boolean): void
}

const signupForm: React.FC<Props> = ({ setLoading }) => {
    const [formSuccess, setFormSuccess] = useState(null)
    const [formError, setFormError] = useState(null)
    const formRef = useRef<FormHandles>(null)

    const { setUser } = useUser()

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
            const { data: user } = await axios.post('/users/create', data)
            setFormSuccess('Por favor, confirme o seu email')
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
            console.log(err)
        }
    }

    // useEffect(() => {
    //     if (process.env.NODE_ENV === 'production') {
    //         const script = document.createElement('script')
    //         script.src =
    //             'https://d335luupugsy2.cloudfront.net/js/loader-scripts/31b1baaa-692a-4486-97a9-784d5b4008be-loader.js'
    //         script.async = true
    //         script.type = 'text/javascript'
    //         document.body.appendChild(script)
    //     }
    // }, [])

    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
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
