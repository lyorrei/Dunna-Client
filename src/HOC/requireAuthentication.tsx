import React from 'react'
import axios from '../../axios'
import Router from 'next/router'
import { NextPageContext } from 'next'
import Sidebar from '../components/sidebar'

const RequireAuthentication = (WrappedComponent, isAdmin?: boolean) => {
    return class extends React.Component {
        static async getInitialProps(ctx: NextPageContext) {
            let token = null
            if (ctx.req) {
                token = ctx.req.headers.cookie?.replace('token=', '')
            }

            try {
                let user = null
                if (isAdmin) {
                    if (ctx.req) {
                        const { data } = await axios.get('/users/isadmin', {
                            headers: {
                                Cookie: `token=${token};`
                            },
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
                            },
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
                        Location: '/auth'
                    })
                    ctx.res.end()
                } else {
                    Router.push('/auth')
                }
            }
            return {}
        }

        render() {
            return (
                <>
                    {isAdmin ? (
                        <>
                            <Sidebar />
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '18vw',
                                    width: '82vw'
                                }}
                            >
                                <WrappedComponent {...this.props} />
                            </div>
                        </>
                    ) : (
                        <WrappedComponent {...this.props} />
                    )}
                </>
            )
        }
    }
}

export default RequireAuthentication
