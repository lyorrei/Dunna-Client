import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import AddressForm from '../../components/addressForm'
import RequireAuthentication from '../../HOC/requireAuthentication'

const newAddress = () => {
    return (
        <>
            <Head>
                <title>Dunna - Novo endereço</title>
            </Head>
            <AddressForm
                title="Novo Endereço"
                submitType="post"
                submitLink="/address/create"
            />
        </>
    )
}

export default RequireAuthentication(newAddress)
