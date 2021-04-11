import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import { PageContainer } from '../styles/pages'

import Header from '../components/header'
import withCart from '../HOC/withCart'

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
                <title>Dunna Jewelry</title>
            </Head>
            <PageContainer
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <Header />
            </PageContainer>
        </>
    )
}

export default withCart(Home)
