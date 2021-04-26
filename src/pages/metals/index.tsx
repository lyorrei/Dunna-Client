import React, { useState } from 'react'
import axios from '../../../axios'
import Head from 'next/head'
import { NextPageContext } from 'next'
import RequireAuthentication from '../../HOC/requireAuthentication'

import {
    PageContainer,
    Container,
    ActionsTd
} from '../../styles/pages/products'

import Table from '../../components/table'

import { StonesAndShapes } from '../shop/products'
import ConfirmModal from '../../components/confirmModal'
import Modal from '../../components/modal'
import { Input } from '../../components/input/style'
import { InlineButton } from '../../components/button'

import { FaTrash } from 'react-icons/fa'

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
