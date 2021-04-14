import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import { NextPageContext } from 'next'
import RequireAuthentication from '../../HOC/requireAuthentication'

import ProductFields from '../../components/productFields'

import { StonesAndShapes } from '../shop'


interface Props {
    stones: StonesAndShapes[]
}

const stonesPage = ({ stones }: Props) => {
    return (
        <>
            <Head>
                <title>Dunna - Stones</title>
            </Head>
            <ProductFields
                createLink="/stones/create"
                deleteLink="/stone/"
                options={stones}
                title="Criar Pedra"
            />
        </>
    )
}

stonesPage.getInitialProps = async (
    context: NextPageContext,
    token: string
) => {
    const { data: stones } = await axios.get('/stones', {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        stones

        // will be passed to the page component as props
    }
}

export default RequireAuthentication(stonesPage, true)
