import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../axios'
import * as Yup from 'yup'

import { SubmitHandler, FormHandles } from '@unform/core'
import Input from '../input'

import Button from '../button'
import Form from '../form'
import Alert, { Types } from '../alert'

import Router from 'next/router'
import { useUser } from '../../context/User'
import Link from 'next/link'
import { useHistory } from '../../context/History'
import { useCart } from '../../context/Cart'
import { LoginTitle } from './style'

interface Props {
    setLoading(boolean: boolean): void
}

const loginForm: React.FC<Props> = ({ setLoading }) => {
    const [formError, setFormError] = useState(null)
    const formRef = useRef<FormHandles>(null)
    const { user, setUser } = useUser()
    const { tempProduct, addProduct } = useCart()
    const { back } = useHistory()

    const handleSubmit: SubmitHandler<FormData> = async formData => {
        try {
            // Remove all previous errors
            setFormError(null)
            formRef.current.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('O e-mail é obrigatório'),
                password: Yup.string().required('A senha é obrigatória')
            })
            await schema.validate(formData, {
                abortEarly: false
            })

            // Validation passed
            setLoading(true)
            const { data } = await axios.post('/users/login', formData)
            setUser(data)
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

    useEffect(() => {
        if (user) {
            if (tempProduct) {
                addProduct(tempProduct)
                return Router.back()
            }
            Router.replace('/shop')
        }
    }, [user])

    return (
        <div>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <LoginTitle>
                    Faça Login na sua conta!
                </LoginTitle>

                {formError && <Alert type={Types.red}>{formError}</Alert>}

                <Input name="email" label="Email" type="email" />
                <Input name="password" label="Senha" type="password" />
                <Link href="/recovery">
                    <a>Problemas com o Login?</a>
                </Link>

                <Button type="submit">Entrar</Button>
            </Form>
        </div>
    )
}

export default loginForm
