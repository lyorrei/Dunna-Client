import React, { useEffect } from 'react'
import axios from '../../axios'

import CartProvider from '../context/Cart'
import UserProvider, { useUser } from '../context/User'
import { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

import { CookiesProvider, useCookies } from 'react-cookie'

import Page from '../components/page'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CookieConsent from 'react-cookie-consent'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
    return (
        // <Elements stripe={stripePromise}>
        // {/* </Elements> */}
            <CookiesProvider>
                <UserProvider>
                    <CartProvider>
                        <ThemeProvider theme={theme}>
                            <Page
                                Component={Component}
                                router={router}
                                pageProps={pageProps}
                            />
                            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
                        </ThemeProvider>
                    </CartProvider>
                </UserProvider>
            </CookiesProvider>
    )
}

export default MyApp
