import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Link from 'next/link'
import Confirmation from '../../components/confirmationPage'

import PageContainers from '../../components/PageContainers'
import Title from '../../components/title'
import { InlineButton } from '../../components/button'
import ButtonContainer from '../../components/buttonContainer'

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
