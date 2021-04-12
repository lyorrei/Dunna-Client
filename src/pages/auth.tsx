import React, { useEffect, useState } from 'react'
import {
    Content,
    Container,
    ButttonContainer,
    ButtonLogin,
    ButtonSignup,
    AuthContainer
} from '../styles/pages/auth'
import ContainerBg from '../images/nature.jpg'
import LoginForm from '../components/loginForm'
import SignupForm from '../components/signupForm'
import CircleLoader from 'react-spinners/CircleLoader'

import Head from 'next/head'
import { useUser } from '../context/User'

const containerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
}

const contentVariant = {
    hidden: { opacity: 0, scale: 0.5, x: '-50%', y: '-50%' },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6
        }
    }
}

const auth: React.FC = () => {
    const [login, setLogin] = useState(true)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Head>
                <title>
                    {login ? 'Dunna - Entrar' : 'Dunna - Criar conta'}
                </title>
            </Head>
            <Container
                background={ContainerBg}
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <Content variants={contentVariant}>
                    <ButttonContainer loading={loading ? 1 : 0}>
                        <ButtonLogin
                            login={login}
                            onClick={() => setLogin(true)}
                        >
                            Entrar
                        </ButtonLogin>
                        <ButtonSignup
                            login={login}
                            onClick={() => setLogin(false)}
                        >
                            Criar conta
                        </ButtonSignup>
                    </ButttonContainer>
                    <AuthContainer login={login} loading={loading ? 1 : 0}>
                        <LoginForm setLoading={setLoading} />
                        <SignupForm setLoading={setLoading} />
                    </AuthContainer>
                    {loading && (
                        <div style={{ margin: '0 auto', width: '120px' }}>
                            <CircleLoader color={'#00c2a8'} size={120} />
                        </div>
                    )}
                </Content>
            </Container>
        </>
    )
}

export default auth
