import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import {
    Container,
    LeftContainer,
    RightContainer,
    Description,
    Title,
    GridContainer,
    NotBuyableText,
    EditDiv,
    UppercaseText
} from '../../../styles/pages/shop/product'

import ProductImage from '../../../components/productImage'
import ProductChecklist from '../../../components/productChecklist'
import ProductPrice from '../../../components/productPrice'
import ProductButton from '../../../components/productButton'
import Loader from '../../../components/loader'

import Head from 'next/head'
import { ProductInterface } from '../../../components/product'

import withCart from '../../../HOC/withCart'

import { useRouter } from 'next/router'

import { getAllVisibleProducts, getSingleProduct } from '../../../../common'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useUser } from '../../../context/User'

interface Props {
    product: ProductInterface
}

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

const RightContainerVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6
        }
    }
}

const product: React.FC<Props> = ({ product }) => {
    const router = useRouter()
    const { user } = useUser()

    if (router.isFallback) {
        return (
            <Container
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <Loader />
            </Container>
        )
    }

    return (
        <>
            <Head>
                <title>DUNNA® | {product.name}</title>
            </Head>
            <Container
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <GridContainer>
                    <LeftContainer>
                        <ProductImage product={product} />
                    </LeftContainer>
                    <RightContainer variants={RightContainerVariant}>
                        <Title>{product.name}</Title>

                        <UppercaseText>
                            By <span>Dunna Jewelry</span>
                        </UppercaseText>

                        <ProductPrice product={product} />

                        <Description>{product.description}</Description>

                        {product.notBuyable && (
                            <NotBuyableText>
                                Entre em contato por Whatsapp se tiver interesse
                                neste produto!
                            </NotBuyableText>
                        )}

                        <ProductButton product={product} />

                        <ProductChecklist product={product} />

                        {user && user.admin && (
                            <EditDiv>
                                <Link href={'/products/edit/' + product._id}>
                                    <a>Editar Produto</a>
                                </Link>
                            </EditDiv>
                        )}
                    </RightContainer>
                </GridContainer>
            </Container>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Connect to Database
    await require('../../../../server/src/db/mongoose')()

    // Call an external API endpoint to get products
    const products = await JSON.parse(
        JSON.stringify(await getAllVisibleProducts())
    )

    // Get the paths we want to pre-render based on posts
    const paths = products.map(product => ({
        params: { id: product._id }
    }))

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ctx => {
    // Connect to Database
    await require('../../../../server/src/db/mongoose')()

    // Get Data
    const product = JSON.parse(
        JSON.stringify(await getSingleProduct(ctx.params.id))
    )

    return {
        props: {
            product
        }, // will be passed to the page component as props
        revalidate: 20
    }
}

export default withCart(product)
