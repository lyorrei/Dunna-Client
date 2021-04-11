import React, { useRef, useState } from 'react'
import axios from '../../../axios'
import * as Yup from 'yup'

import { SubmitHandler, FormHandles } from '@unform/core'
import Input from '../input'

import Button from '../button'
import Form from '../form'
import Alert, { Types } from '../alert'

import Router from 'next/router'
import { useUser } from '../../context/User'

interface Props {
    setLoading(boolean: boolean): void
}

const loginForm: React.FC<Props> = ({ setLoading }) => {
    const [formError, setFormError] = useState(null)
    const formRef = useRef<FormHandles>(null)
    const { setUser } = useUser()

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
            const { data: user } = await axios.post('/users/login', formData)
            setUser(user)
            Router.replace('/shop')
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
        <Form ref={formRef} onSubmit={handleSubmit}>
            {formError && <Alert type={Types.red}>{formError}</Alert>}

            <Input name="email" label="Email" type="email" />
            <Input name="password" label="Senha" type="password" />

            <Button type="submit">Vamoo</Button>
        </Form>
    )
}

export default loginForm
