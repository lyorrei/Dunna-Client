import React from 'react'

import Head from 'next/head'
import Confirmation from '../../components/confirmationPage'

const confirmationFail = () => {
    return (
        <>
            <Head>
                <title>Dunna - Confirmation Fail</title>
            </Head>

            <Confirmation
                title="Erro ao tentar confirmar seu Email!"
                subTitle="Por favor, vá para a página de reenvio de email. Se o Problema persistir, por favor entre em contato conosco."
                link="/recovery/confirmation"
                linkName="Ir para página de reenvio"
            />
        </>
    )
}

export default confirmationFail
