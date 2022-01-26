import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import Head from 'next/head'

import {
    PageContainer,
    Container,
    EmptyCart
} from '../../styles/pages/checkout'

import RequireAuthentication from '../../HOC/requireAuthentication'

import { useCart } from '../../context/Cart'

import CheckoutBackground from '../../images/checkout2.jpg'

import { Address } from '../addresses'
import { User } from '../me'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import CheckoutBoxes from '../../components/checkoutBoxes'

const pageContainerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
}

export const BoxContainerVariants = {
    hidden: {
        opacity: 0,
        y: '-120%'
    },
    visible: {
        opacity: 1,
        y: '0%'
    }
}

interface Props {
    myAddresses: Address[]
    user: User
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const checkout = ({ myAddresses, user }: Props) => {
    const { cart, setCoupon } = useCart()
    const Router = useRouter()
    const [cookies, setCookie] = useCookies(['rdcheckout'])

    useEffect(() => {
        if (cart.length === 0) {
            Router.replace('/shop')
            return
        }

        if (process.env.NODE_ENV !== 'development' && !cookies.rdcheckout) {
            axios
                .get('/rdcheckout')
                .then(res =>
                    setCookie('rdcheckout', 'rdcheckout', {
                        path: '/'
                        // Session
                    })
                )
                .catch(err => {})
        }

        return () => {
            setCoupon(null)
        }
    }, [])

    let pageContent = (
        <Container>
            <EmptyCart>
                Sua sacola está vazia, você será redirecionado para a loja.
            </EmptyCart>
        </Container>
    )
    if (cart.length > 0) {
        pageContent = <CheckoutBoxes myAddresses={myAddresses} user={user} />
    }

    return (
        <>
            <Head>
                <title>DUNNA® | Checkout</title>
            </Head>
            <Elements stripe={stripePromise}>
                <PageContainer
                    variants={pageContainerVariant}
                    initial="hidden"
                    animate="visible"
                    imageUrl={CheckoutBackground}
                >
                    {pageContent}
                </PageContainer>
            </Elements>
        </>
    )
}

checkout.getInitialProps = async (ctx, token) => {
    if (!ctx.query.method) {
        ctx.res.writeHead(302, {
            Location: '/shop'
        })
        ctx.res.end()
    }
    if (ctx.query.method !== 'stripe' && ctx.query.method !== 'paypal') {
        ctx.res.writeHead(302, {
            Location: '/shop'
        })
        ctx.res.end()
    }
    const { data: myAddresses } = await axios.get('/addresses', {
        headers: {
            Cookie: `token=${token};`
        }
    })
    return { myAddresses }
}

export default RequireAuthentication(checkout, false, true)
