import React from 'react'
import Head from 'next/head'

import { HeaderContainer, PageContainer } from '../styles/pages'

import Header from '../components/header'
import withCart from '../HOC/withCart'
import Spotlight from '../components/spotlight'
import { motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import { ProductInterface } from '../components/product'
import ImageSection from '../components/imageSection'
import VogueSection from '../components/vogueSection'
import { getSpotlightProducts } from '../../common'

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
                <title>DUNNA® | Alta Joalheria</title>
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

export const getStaticProps: GetStaticProps = async ctx => {
    // Connect to Database
    await require('../../server/src/db/mongoose')()

    // Get Data
    const products = JSON.parse(JSON.stringify(await getSpotlightProducts()))

    return {
        props: {
            products
        }, // will be passed to the page component as props
        revalidate: 20
    }
}

export default withCart(Home)
