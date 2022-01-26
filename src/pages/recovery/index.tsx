import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import PageContainers from '../../components/pageWrapper'
import Title from '../../components/title'

import Box from '../../components/box'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

const confirmationResend = () => {
    const [items] = useState([
        {
            title: 'Reenviar Email de confirmação',
            subTitle: 'Reenviar email de confirmação da conta',
            link: '/recovery/confirmation',
            icon: AiOutlineMail
        },
        {
            title: 'Recuperar senha',
            subTitle: 'Recuperar a senha da conta',
            link: '/recovery/password',
            icon: RiLockPasswordLine
        }
    ])

    return (
        <>
            <Head>
                <title>DUNNA® | Recovery</title>
            </Head>

            <PageContainers>
                <Title>Ajuda com a conta</Title>
                <div style={{ display: 'grid', gridGap: '4rem' }}>
                    {items.map(item => (
                        <Box
                            link={item.link}
                            Icon={item.icon}
                            title={item.title}
                            subTitle={item.subTitle}
                        />
                    ))}
                </div>
            </PageContainers>
        </>
    )
}

export default confirmationResend
