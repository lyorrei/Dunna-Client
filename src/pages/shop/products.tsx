import React, { useRef, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'
import Product from '../../components/product'
import {
    Container,
    Title,
    GridContainer,
    NoProducts
} from '../../styles/pages/shop/shop'
import { ProductInterface } from '../../components/product'

import FilterProducts from '../../components/filterProducts'
import { FormHandles } from '@unform/core'
import withCart from '../../HOC/withCart'
import { GetServerSideProps } from 'next'
import ShopCard from '../../components/shopCard'

import {
    getProducts,
    getStones,
    getShapes,
    getProductTypes
} from '../../../server/src/common'
import { useRouter } from 'next/router'

const container = {
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

const titleVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

export const item = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3
        }
    }
}

export interface StonesAndShapes {
    _id: string
    name: string
}

interface Props {
    products: ProductInterface[]
    stones: StonesAndShapes[]
    shapes: StonesAndShapes[]
    productTypes: StonesAndShapes[]
}

const shop: React.FC<Props> = ({
    products: productsFromProps,
    stones,
    shapes,
    productTypes
}) => {
    const [products, setProducts] = useState(productsFromProps)
    const [priceValue, setPriceValue] = useState({ min: 0, max: 10000 })
    const formRef = useRef<FormHandles>(null)
    const router = useRouter()

    const handleFilterChange = (range?) => {
        setTimeout(() => {
            const data: any = formRef.current.getData()
            let filteredProducts = [...productsFromProps]

            // if (data.productTypes.length > 0) {
            //     filteredProducts = filteredProducts.filter(product =>
            //         data.productTypes.includes(product.productType)
            //     )
            // }

            if (data.stones.length > 0) {
                filteredProducts = filteredProducts.filter(product =>
                    data.stones.includes(product.stone)
                )
            }

            if (data.shapes.length > 0) {
                filteredProducts = filteredProducts.filter(product =>
                    data.shapes.includes(product.shape)
                )
            }

            if (range) {
                filteredProducts = filteredProducts.filter(product => {
                    const priceFormated = product.price / 100

                    return (
                        priceFormated >= range.min && priceFormated <= range.max
                    )
                })
            }

            setProducts(filteredProducts)
        }, 0)
    }

    const handleFiltering = range => {
        setPriceValue(range)
    }

    let title = 'Dunna Jewelry Shop'
    switch (router.query.type) {
        case 'Anel':
            title = 'Aneis'
            break
        case 'Colar':
            title = 'Colares'
            break
        case 'Brinco':
            title = 'Brincos'
            break
        case 'Pingente':
            title = 'Pingentes'
            break
        case 'Pulseira':
            title = 'Pulseiras'
            break
        case 'Pura':
            title = 'Gemas'
            break
    }

    return (
        <>
            <Head>
                <title>Dunna - Shop</title>
            </Head>
            <Container variants={container} initial="hidden" animate="visible">
                <Title variants={titleVariant}>{title}</Title>

                {productsFromProps.length > 0 ? (
                    <>
                        <FilterProducts
                            productTypes={productTypes}
                            handleFilterChange={handleFilterChange}
                            stones={stones}
                            shapes={shapes}
                            formRef={formRef}
                            priceValue={priceValue}
                            changeHandler={handleFiltering}
                        />

                        <GridContainer>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <Product key={product._id} {...product} />
                                ))
                            ) : (
                                <NoProducts>
                                    Nenhum produto encontrado
                                </NoProducts>
                            )}
                        </GridContainer>
                    </>
                ) : (
                    <NoProducts>O estoque está esgotado</NoProducts>
                )}
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    let url = '/products'
    if (ctx.query.type) {
        url = `/products?type=${ctx.query.type}`
    }
    // GET PRODUCTS AND OPTIONS
    const { data: products } = await axios.get(url)
    const stones = JSON.parse(JSON.stringify(await getStones()))
    const shapes = JSON.parse(JSON.stringify(await getShapes()))
    const productTypes = JSON.parse(JSON.stringify(await getProductTypes()))

    return {
        props: {
            products,
            stones,
            shapes,
            productTypes
        } // will be passed to the page component as props
    }
}

export default withCart(shop)
