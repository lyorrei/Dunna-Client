import React from 'react'

import Head from 'next/head'

import Confirmation from '../../components/confirmationPage'

const confirmationSuccess = () => {
    return (
        <>
            <Head>
                <title>DUNNA® | Confirmation Success</title>
            </Head>

            <Confirmation
                title="Seu email foi confirmado com sucesso!"
                subTitle=" Agora você já pode fazer Login na sua conta."
                link="/auth"
                linkName="Login"
            />
        </>
    )
}

export default confirmationSuccess
