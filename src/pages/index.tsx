import React from 'react'
import axios from '../../axios'

import Head from 'next/head'

import { HeaderContainer, PageContainer } from '../styles/pages'

import Header from '../components/header'
import withCart from '../HOC/withCart'
import Spotlight from '../components/spotlight'
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { ProductInterface } from '../components/product'
import ImageSection from '../components/imageSection'
import VogueSection from '../components/vogueSection'

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

interface Props {
    products: ProductInterface[]
}

const Home = ({ products }: Props) => {
    return (
        <>
            <Head>
                <title>Dunna Jewelry</title>
            </Head>
            <motion.div
                variants={pageContainerVariant}
                initial="hidden"
                animate="visible"
            >
                <HeaderContainer>
                    <Header />
                </HeaderContainer>
                <PageContainer>
                    <Spotlight products={products} />
                    <ImageSection />
                    <VogueSection />
                </PageContainer>
            </motion.div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { data: products } = await axios.get('/products/spotlight')

    return {
        props: {
            products
        }
    }
}

export default withCart(Home)
