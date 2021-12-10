import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { MdAccountBox } from 'react-icons/md'
import { FaDropbox } from 'react-icons/fa'

import { ImLocation } from 'react-icons/im'

import {
    PageContainer,
    Container,
    Item,
    Title
} from '../styles/pages/myaccount'

import RequireAuthentication from '../HOC/requireAuthentication'

import Box from '../components/box'

const pageContainerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
}

const Home = () => {
    const [items] = useState([
        {
            title: 'Dados pessoais',
            subTitle: 'Visualizar e alterar seus dados pessoais',
            link: '/me',
            icon: MdAccountBox
        },
        {
            title: 'Seus pedidos',
            subTitle: 'Visualizar seus pedidos',
            link: '/orders',
            icon: FaDropbox
        },
        {
            title: 'Endereços',
            subTitle:
                'Visualizar, adicionar e alterar seus endereços cadastrados',
            link: '/addresses',
            icon: ImLocation
        }
    ])

    return (
        <>
            <Head>
                <title>DUNNA® | Minha conta</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Sua conta</Title>
                    {items.map((item, index) => (
                        <Box
                            key={index}
                            link={item.link}
                            Icon={item.icon}
                            title={item.title}
                            subTitle={item.subTitle}
                        />
                    ))}
                </Container>
            </PageContainer>
        </>
    )
}

export default RequireAuthentication(Home)
