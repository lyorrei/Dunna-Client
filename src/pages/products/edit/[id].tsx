import axios from '../../../../axios'
import { NextPageContext } from 'next'
import React from 'react'
import RequireAuthentication from '../../../HOC/requireAuthentication'
import Head from 'next/head'
import ProductForm from '../../../components/productForm'
import { ProductInterface } from '../../../components/product'
import { StonesAndShapes } from '../../shop/[type]'
import { PageContainer, Container } from '../../../styles/pages/products/edit'

interface Props {
    product: ProductInterface
    stones: StonesAndShapes[]
    shapes: StonesAndShapes[]
    productTypes: StonesAndShapes[]
    metals: StonesAndShapes[]
    types: StonesAndShapes[]
}

const editProduct = ({ product, shapes, stones, productTypes, types, metals }: Props) => {
    return (
        <>
            <Head>
                <title>Dunna - Editar Produto</title>
            </Head>
            <PageContainer>
                <Container>
                    {product && (
                        <ProductForm
                            submitLink={'/product/edit/' + product._id}
                            submitType="patch"
                            title="Editar Produto"
                            shapes={shapes}
                            stones={stones}
                            productTypes={productTypes}
                            types={types}
                            metals={metals}
                            formInitialData={product}
                        />
                    )}
                </Container>
            </PageContainer>
        </>
    )
}

editProduct.getInitialProps = async (ctx: NextPageContext, token: string) => {
    const { data: product } = await axios.get('/product/' + ctx.query.id, {
        headers: {
            Cookie: `token=${token};`
        }
    })

    const shapeName = (' ' + product.shape.name).slice(1)
    const shapeValue = (' ' + product.shape._id).slice(1)
    product.shape = {
        label: shapeName,
        value: shapeValue
    }

    const stoneName = (' ' + product.stone.name).slice(1)
    const stoneValue = (' ' + product.stone._id).slice(1)
    product.stone = {
        label: stoneName,
        value: stoneValue
    }

    const typeName = (' ' + product.productType.name).slice(1)
    const typeValue = (' ' + product.productType._id).slice(1)
    product.productType = {
        label: typeName,
        value: typeValue
    }

    if (product.metal) {
        const metalName = (' ' + product.metal.name).slice(1)
        const metalValue = (' ' + product.metal._id).slice(1)
        product.metal = {
            label: metalName,
            value: metalValue
        }
    }

    if (product.type) {
        const typeName = (' ' + product.type.name).slice(1)
        const typeValue = (' ' + product.type._id).slice(1)
        product.type = {
            label: typeName,
            value: typeValue
        }
    }

    const { data: stones } = await axios.get('/stones', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    const { data: shapes } = await axios.get('/shapes', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    const { data: productTypes } = await axios.get('/productTypes', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    const { data: metals } = await axios.get('/metals', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    const { data: types } = await axios.get('/types', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        product,
        stones,
        shapes,
        productTypes,
        metals,
        types
    }
}

export default RequireAuthentication(editProduct, true)
