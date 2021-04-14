import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import { NextPageContext } from 'next'
import RequireAuthentication from '../../HOC/requireAuthentication'

import ProductFields from '../../components/productFields'
import { StonesAndShapes } from '../shop'

interface Props {
    shapes: StonesAndShapes[]
}

const shapesPage = ({ shapes }: Props) => {
    return (
        <>
            <Head>
                <title>Dunna - Shapes</title>
            </Head>
            <ProductFields
                createLink="/shapes/create"
                deleteLink="/shape/"
                options={shapes}
                title="Criar Formato"
            />
        </>
    )
}

shapesPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: shapes } = await axios.get('/shapes', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        shapes

        // will be passed to the page component as props
    }
}

export default RequireAuthentication(shapesPage, true)
