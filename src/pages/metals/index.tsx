import React from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import { NextPageContext } from 'next'
import RequireAuthentication from '../../HOC/requireAuthentication'
import { StonesAndShapes } from '../shop/[type]'

import ProductFields from '../../components/productFields'

interface Props {
    metals: StonesAndShapes[]
}

const metalsPage = ({ metals }: Props) => {
    return (
        <>
            <Head>
                <title>Dunna - Shapes</title>
            </Head>
            <ProductFields
                createLink="/metals/create"
                deleteLink="/metal/"
                options={metals}
                title="Criar Metal"
            />
        </>
    )
}

metalsPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: metals } = await axios.get('/metals', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        metals
        // will be passed to the page component as props
    }
}

export default RequireAuthentication(metalsPage, true)
