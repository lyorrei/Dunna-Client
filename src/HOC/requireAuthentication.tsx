import React from 'react'
import axios from '../../axios'
import Router from 'next/router'
import Sidebar from '../components/sidebar'
import { parseCookies } from 'nookies'

const RequireAuthentication = (
    WrappedComponent,
    isAdmin?: boolean,
    toCheckout?: boolean
) => {
    return class extends React.Component {
        static async getInitialProps(ctx) {
            let token = null
            if (ctx.req) {
                const { token: tokenFromCookies } = parseCookies(ctx)
                token = tokenFromCookies
            }

            try {
                let user = null
                if (isAdmin) {
                    if (ctx.req) {
                        const { data } = await axios.get('/users/isadmin', {
                            headers: {
                                Cookie: `token=${token};`
                            }
                        })

                        user = data
                    } else {
                        let { data } = await axios.get('/users/isadmin')
                        user = data
                    }
                } else {
                    if (ctx.req) {
                        let response = await axios.get('/users/me', {
                            headers: {
                                Cookie: `token=${token};`
                            }
                        })
                        user = response.data
                    } else {
                        let { data } = await axios.get('/users/me')
                        user = data
                    }
                }

                if (WrappedComponent.getInitialProps) {
                    const pageProps = await WrappedComponent.getInitialProps(
                        ctx,
                        token
                    )
                    return { ...pageProps, user }
                }

                return { user }
            } catch (err) {
                if (ctx.req) {
                    ctx.res.writeHead(302, {
                        Location: toCheckout ? '/auth?checkout=true' : '/auth'
                    })
                    ctx.res.end()
                } else {
                    Router.push(toCheckout ? '/auth?checkout=true' : '/auth')
                }
            }
            return {}
        }

        render() {
            return (
                <>
                    {isAdmin ? (
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <Sidebar />
                            <div
                                style={{
                                    flex: '1 0 82vw'
                                }}
                            >
                                <WrappedComponent {...this.props} />
                            </div>
                        </div>
                    ) : (
                        <WrappedComponent {...this.props} />
                    )}
                </>
            )
        }
    }
}

export default RequireAuthentication
