import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../../axios'
import Head from 'next/head'

import AddressForm from '../../../components/addressForm'
import RequireAuthentication from '../../../HOC/requireAuthentication'
import { Address } from '..'
import { useRouter } from 'next/router'
import { NextPage, NextPageContext } from 'next'

interface Props {
    address: Address
}

const editAddress = ({ address }: Props) => {
    return (
        <>
            <Head>
                <title>Dunna - Editar endereço</title>
            </Head>
            <AddressForm
                title="Editar Endereço"
                formInitialData={address}
                submitType="patch"
                submitLink={'/address/' + address._id}
            />
        </>
    )
}

editAddress.getInitialProps = async (ctx: NextPageContext, token: string) => {
    const { data: address } = await axios.get('/address/' + ctx.query.id, {
        headers: {
            Cookie: `token=${token};`
        }
    })

    return {
        address
    }
}

export default RequireAuthentication(editAddress)
