import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Link from 'next/link'

import PageContainers from '../../components/PageContainers'
import Title from '../../components/title'
import { Label, Input } from '../../components/input/style'

import { FormContainer, Paragraph } from '../../styles/pages/reset'
import { InlineButton } from '../../components/button'
import Alert, { Types } from '../../components/alert'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'

const changePasswordPage = () => {
    const [password, setPassword] = useState(null)
    const [passwordCheck, setPasswordCheck] = useState(null)
    const [formMessage, setFormMessage] = useState(null)
    const router = useRouter()
    const alert = useAlert()

    const handleFormSubmit = async () => {
        setFormMessage(null)
        if (password === null || passwordCheck === null) {
            setFormMessage('Preencha todos os campos')
            return
        }
        if (password !== passwordCheck) {
            setFormMessage('As senhas não coincidem')
            return
        }
        if(password.length < 8) {
            setFormMessage('Mínimo 7 caracteres')
            return
        }

        try {
            await axios.post('/user/reset/' + router.query.token, { password })
            alert.show('Senha alterada com sucesso!')
            router.replace('/auth')
        } catch (e) {
            setFormMessage(
                'Erro ao alterar senha, por favor tente novamente mais tarde! Se o problema persistir, entre em contato conosco.'
            )
        }
    }

    return (
        <>
            <Head>
                <title>DUNNA® | Password</title>
            </Head>

            <PageContainers>
                <Title>Mudar a senha</Title>
                <Paragraph>
                    Por favor, preencha os campos para alterar sua senha
                </Paragraph>

                {formMessage && (
                    <div style={{ margin: '2rem 0' }}>
                        <Alert type={Types.red}>
                            {formMessage}
                        </Alert>
                    </div>
                )}
                <FormContainer>
                    <div>
                        <Label>Nova Senha:</Label>
                        <Input
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Confirmar Senha:</Label>
                        <Input
                            type="password"
                            onChange={e => setPasswordCheck(e.target.value)}
                        />
                    </div>
                </FormContainer>
                <InlineButton onClick={handleFormSubmit}>Enviar</InlineButton>
            </PageContainers>
        </>
    )
}

export default changePasswordPage
