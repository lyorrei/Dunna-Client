import React, { useRef, useState, useEffect } from 'react'

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
import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import {
    getProducts,
    getStones,
    getShapes,
    getProductTypes
} from '../../../common'

import arraySort from 'array-sort'

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
    firstQuery: any
}

const shop: React.FC<Props> = ({
    products: productsFromProps,
    stones,
    shapes,
    productTypes,
    firstQuery
}) => {
    const [currentQuery, setCurrentQuery] = useState(firstQuery)
    const [products, setProducts] = useState(productsFromProps)
    const [priceValue, setPriceValue] = useState({ min: 0, max: 60000 })
    const formRef = useRef<FormHandles>(null)
    const router = useRouter()

    useEffect(() => {
        setProducts(productsFromProps)
    }, [productsFromProps])

    useEffect(() => {
        // Check if it is the first page load
        if (currentQuery !== router.query.type) {
            if (formRef && formRef.current) {
                const shapesSelect = formRef.current.getFieldRef('shapes')
                const stonesSelect = formRef.current.getFieldRef('stones')
                const orderSelect = formRef.current.getFieldRef('order')
                shapesSelect.select.clearValue()
                stonesSelect.select.clearValue()
                orderSelect.select.clearValue()
            }

            setPriceValue({ min: 0, max: 60000 })

            setCurrentQuery(router.query.type)
        }
    }, [router.query.type])

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

            switch (data.order) {
                case 'nameasc':
                    filteredProducts = arraySort(filteredProducts, 'name')
                    break
                case 'namedsc':
                    filteredProducts = arraySort(filteredProducts, 'name', {
                        reverse: true
                    })
                    break
                case 'priceasc':
                    filteredProducts = arraySort(filteredProducts, 'price')
                    break
                case 'pricedsc':
                    filteredProducts = arraySort(filteredProducts, 'price', {
                        reverse: true
                    })
                    break
                case 'new':
                    filteredProducts = arraySort(
                        filteredProducts,
                        'createdAt',
                        {
                            reverse: true
                        }
                    )
                    break
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
            title = 'Anéis'
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
        case 'Gema':
            title = 'Gemas'
            break
        case 'Men':
            title = 'Men'
            break
        case 'Wedding':
            title = 'Casamento'
            break
    }

    return (
        <>
            <Head>
                <title>DUNNA® | Shop</title>
            </Head>
            <Container variants={container} initial="hidden" animate="visible">
                <Title variants={titleVariant}>{title}</Title>

                {productsFromProps && productsFromProps.length > 0 ? (
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

export const getStaticPaths: GetStaticPaths = async () => {
    const types = [
        'Anel',
        'Colar',
        'Brinco',
        'Pingente',
        'Pulseira',
        'Gema',
        'Desconto',
        'Men',
        'Wedding'
    ]
    const paths = types.map(type => ({
        params: { type }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ctx => {
    // Connect to Database
    await require('../../../server/src/db/mongoose')()

    // Get Data
    const products = JSON.parse(
        JSON.stringify(await getProducts(ctx.params.type))
    )
    const shapes = JSON.parse(JSON.stringify(await getShapes()))
    const productTypes = JSON.parse(JSON.stringify(await getProductTypes()))
    const stones = JSON.parse(JSON.stringify(await getStones()))
    const firstQuery = ctx.params.type

    return {
        props: {
            products,
            stones,
            shapes,
            productTypes,
            firstQuery
        }, // will be passed to the page component as props
        revalidate: 20
    }
}

export default withCart(shop)
