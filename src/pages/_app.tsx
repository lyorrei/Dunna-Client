import React, { useEffect } from 'react'

import CartProvider from '../context/Cart'
import UserProvider from '../context/User'
import { HistoryProvider } from '../context/History'

import { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

import { CookiesProvider } from 'react-cookie'

import Page from '../components/page'
import { loadStripe } from '@stripe/stripe-js'

import AlertTemplate from 'react-alert-template-basic'
import { transitions, Provider as AlertProvider } from 'react-alert'

import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import '../styles/npstyle.css'

declare const window: any

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
    // Google Analytics
    const nextRouter = useRouter()
    const handleRouteChange = url => {
        window.gtag('config', 'UA-206765746-1', {
            page_path: url
        })
    }

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            nextRouter.events.on('routeChangeComplete', handleRouteChange)
            return () => {
                nextRouter.events.off('routeChangeComplete', handleRouteChange)
            }
        }
    }, [nextRouter.events])

    return (
        // <Elements stripe={stripePromise}>
        // {/* </Elements> */}
        <CookiesProvider>
            <UserProvider>
                <CartProvider>
                    <HistoryProvider>
                        <AlertProvider template={AlertTemplate} {...options}>
                            <ThemeProvider theme={theme}>
                                <Page
                                    Component={Component}
                                    router={router}
                                    pageProps={pageProps}
                                />
                            </ThemeProvider>
                        </AlertProvider>
                    </HistoryProvider>
                </CartProvider>
            </UserProvider>
        </CookiesProvider>
    )
}

export default MyApp
