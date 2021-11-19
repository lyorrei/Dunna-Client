import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import GlobalStyles from '../../styles/global'
import Navbar from '../navbar'
import { Content } from '../../styles/pages/app'
import { useUser } from '../../context/User'
import { useRouter } from 'next/router'
import Modal from '../modal'
import Footer from '../footer'
import PageAlert from '../pageAlert'

import { useCookies } from 'react-cookie'

const page: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { setUser } = useUser()
    const router = useRouter()
    const [showCookiesModal, setShowCookiesModal] = useState(false)

    const [showPageAlert, setShowPageAlert] = useState(false)
    const [cookies, setCookie] = useCookies(['pageAlert'])
    const [authCookies, setAuthCookies] = useCookies(['rd_auth_status'])

    useEffect(() => {
        // Check if user is authenticated
        axios
            .get('/users/me')
            .then(res => setUser(res.data))
            .catch(e => {})

        if (process.env.NODE_ENV !== 'development') {
            // Check the URL starts with 'http://xxxxx' protocol, if it does then redirect to 'https://xxxxx' url of same resource
            var httpTokens = /^http:\/\/(.*)$/.exec(window.location.href)
            if (httpTokens) {
                window.location.replace('https://' + httpTokens[1])
            }

            // Set Cookies for Rd Station
            if (!authCookies.rd_auth_status) {
                axios
                    .get('/rdtoken')
                    .then(res =>
                        setAuthCookies('rd_auth_status', 'rd_auth_status', {
                            path: '/',
                            maxAge: 60 * 60 * 24 // 1 Day
                        })
                    )
                    .catch(err => {})
            }
        }

        // Modals
        if (!navigator.cookieEnabled) {
            setShowCookiesModal(true)
        }
        if (!cookies['pageAlert']) {
            setShowPageAlert(true)
        }
    }, [])

    const closePageAlert = () => {
        setShowPageAlert(false)
        setCookie('pageAlert', 'pageAlert', { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 7 Days
    }

    return (
        <>
            <Navbar />
            <Content>
                <Modal
                    show={showCookiesModal}
                    closeModal={() => setShowCookiesModal(false)}
                    title="Atenção"
                >
                    <p style={{ fontSize: '1.8rem' }}>
                        Por favor, habilite seus Cookies!
                    </p>
                </Modal>
                <Component {...pageProps} />
                <Footer />
            </Content>
            <GlobalStyles />
            {showPageAlert && (
                <PageAlert
                    closeAlert={closePageAlert}
                    text="Frete grátis para todo o país"
                />
            )}
        </>
    )
}

export default page
