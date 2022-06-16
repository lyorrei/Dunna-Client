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
        if (!cookies['cookiesModal']) {
            setShowCookiesModal(true)
        }
        if (!cookies['pageAlert']) {
            setShowPageAlert(true)
        }
    }, [])

    const closeCookiesModal = () => {
        setShowCookiesModal(false)
        setCookie('cookiesModal', 'cookiesModal', {
            path: '/',
            maxAge: 60 * 60 * 24 * 90
        }) // 90 Days
    }

    const closePageAlert = () => {
        setShowPageAlert(false)
        setCookie('pageAlert', 'pageAlert', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        }) // 7 Days
    }

    return (
        <>
            <Navbar />
            <Content>
                <Modal
                    show={showCookiesModal}
                    closeModal={closeCookiesModal}
                    title="Nós usamos cookies"
                >
                    <p style={{ fontSize: '1.8rem' }}>
                        Este website está em conformidade com a Lei Geral de
                        Proteção de Dados (LGPD) e utiliza cookies para oferecer
                        uma melhor experiência ao visitante.
                        <br />
                        Ao navegar em nosso site, você consente com a nossa{' '}
                        <a
                            href="/pdfs/terms.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#00c2a8',
                                textDecoration: 'none'
                            }}
                        >
                            política de privacidade.
                        </a>
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
