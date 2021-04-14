import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import GlobalStyles from '../../styles/global'
import Navbar from '../navbar'
import { Content } from '../../styles/pages/app'
import { useUser } from '../../context/User'
import { useRouter } from 'next/router'
import Modal from '../modal'

const page: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { setUser } = useUser()
    const router = useRouter()
    const [showCookiesModal, setShowCookiesModal] = useState(true)

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            // Check the URL starts with 'http://xxxxx' protocol, if it does then redirect to 'https://xxxxx' url of same resource
            var httpTokens = /^http:\/\/(.*)$/.exec(window.location.href)
            if (httpTokens) {
                window.location.replace('https://' + httpTokens[1])
            }
        }
        axios
            .get('/users/me')
            .then(res => setUser(res.data))
            .catch(e => {})

        // if (!navigator.cookieEnabled) {
            // setShowCookiesModal(true)
        // }
    }, [])

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
                        Caso os cookies no seu navegador não estejam habilitados, por favor habilite-os, se não, partes do site não irão funcionar.
                    </p>
                </Modal>
                <Component {...pageProps} />
            </Content>
            <GlobalStyles />
        </>
    )
}

export default page
