import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Link from 'next/link'

import PageContainers from '../../components/PageContainers'
import Title from '../../components/title'
import { Label, Input } from '../../components/input/style'

import {
    FormContainer,
    Paragraph
} from '../../styles/pages/recovery/confirmation'
import { InlineButton } from '../../components/button'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'

const confirmationResend = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert()
    const router = useRouter()

    const handleFormSubmit = async () => {
        if (email === '') return
        try {
            await axios.post('/user/confirmation/resend', { email })
        } catch (e) {}

        alert.show(
            'Se uma conta com esse Email existir, o email de confirmação será enviado!'
        )
        router.replace('/auth')
    }

    return (
        <>
            <Head>
                <title>Dunna - Confirmation</title>
            </Head>

            <PageContainers>
                <Title>Reenviar confirmação de Email</Title>
                <Paragraph>
                    Caso sua conta esteja desabilitada, reenvie o email de
                    confirmação para ativá-la.
                </Paragraph>

                <FormContainer>
                    <div>
                        <Label>Email:</Label>
                        <Input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <InlineButton onClick={handleFormSubmit}>
                        Enviar
                    </InlineButton>
                </FormContainer>
            </PageContainers>
        </>
    )
}

export default confirmationResend
