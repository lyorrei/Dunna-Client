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
    return (
        <>
            <Head>
                <title>Dunna - Minha conta</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Container>
                    <Title>Sua conta</Title>
                    <Link href="/me">
                        <Item>
                            <MdAccountBox />
                            <div>
                                <h4>Dados pessoais</h4>
                                <p>Visualizar e alterar seus dados pessoais</p>
                            </div>
                        </Item>
                    </Link>
                    <Link href="/orders">
                        <Item>
                            <FaDropbox />
                            <div>
                                <h4>Seus pedidos</h4>
                                <p>Visualizar seus pedidos</p>
                            </div>
                        </Item>
                    </Link>
                    <Link href="/addresses">
                        <Item>
                            <ImLocation />
                            <div>
                                <h4>Endereços</h4>
                                <p>
                                    Visualizar, adicionar e alterar seus
                                    endereços cadastrados
                                </p>
                            </div>
                        </Item>
                    </Link>
                </Container>
            </PageContainer>
        </>
    )
}

export default RequireAuthentication(Home)
