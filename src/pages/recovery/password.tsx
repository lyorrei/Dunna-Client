import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'

import PageContainers from '../../components/pageContainers'
import Title from '../../components/title'
import { Label, Input } from '../../components/input/style'

import {
    FormContainer,
    Paragraph
} from '../../styles/pages/recovery/confirmation'
import { InlineButton } from '../../components/button'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'

const passwordRecovery = () => {
    const [email, setEmail] = useState(null)
    const alert = useAlert()
    const router = useRouter()

    const handleFormSubmit = async () => {
        if (email === '') return

        try {
            await axios.post('/user/password/reset', { email })
        } catch (e) {}

        alert.show(
            'Se uma conta com esse Email existir, o email de troca de senha será enviado!'
        )
        router.replace('/auth')
    }

    return (
        <>
            <Head>
                <title>DUNNA® | Password</title>
            </Head>

            <PageContainers>
                <Title>Enviar email de recuperação de senha</Title>
                <Paragraph>
                    Caso você tenha esquecido a sua senha, envie o email de
                    recuperação para editá-la.
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

export default passwordRecovery
