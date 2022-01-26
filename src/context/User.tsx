import { useRouter } from 'next/router'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../../axios'
import { useCart } from './Cart'

const UserContext = createContext(null)

export default function CountProvider({ children }) {
    const [user, setUser] = useState(null)

    const [cartCookie, setCartCookie, removeCartCookie] = useCookies(['rdcart'])
    const [checkoutCookie, setCheckoutCookie, removeCheckoutCookie] =
        useCookies(['rdcheckout'])

    const Router = useRouter()

    const handleLogout = async (replaceLink: string) => {
        await axios.post('/users/logout')
        setUser(null)
        removeCartCookie('rdcart', {
            path: '/',
            maxAge: 60 * 60 * 24 * 11 // 11 dias
        })
        removeCheckoutCookie('rdcheckout', {
            path: '/'
            // Session
        })
        Router.replace(replaceLink)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                handleLogout
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUser must be used within a UserProvider')
    const { user, setUser, handleLogout } = context
    return { user, setUser, handleLogout }
}
