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

import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import Router from 'next/router'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import '../styles/npstyle.css'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const options = {
    // position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE
}

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
    return (
        // <Elements stripe={stripePromise}>
        // {/* </Elements> */}
        <CookiesProvider>
            <UserProvider>
                <CartProvider>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <ThemeProvider theme={theme}>
                            <Page
                                Component={Component}
                                router={router}
                                pageProps={pageProps}
                            />
                        </ThemeProvider>
                    </AlertProvider>
                </CartProvider>
            </UserProvider>
        </CookiesProvider>
    )
}

export default MyApp
