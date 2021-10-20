import React, { createContext, useState, useContext, useEffect } from 'react'
import { ProductInterface } from '../components/product'
import { useCookies } from 'react-cookie'
import { useUser } from './User'
import axios from '../../axios'
import { useRouter } from 'next/router'

const CartContext = createContext(null)

export const checkIfProductIsInCart = (
    cart: ProductInterface[],
    product: ProductInterface
) => {
    const value = cart.some(
        productFromCart => productFromCart._id === product._id
    )

    return value
}

export default function CountProvider({ children }) {
    const [cart, setCart] = useState([])
    const [tempProduct, setTempProduct] = useState(null)

    const { user } = useUser()
    const [cookies, setCookies] = useCookies(['rdcart'])
    const Router = useRouter()

    useEffect(() => {
        if (
            user &&
            !cookies.rdcart &&
            cart.length > 0 &&
            process.env.NODE_ENV !== 'development'
        ) {
            axios
                .get('/rdcart')
                .then(res => {
                    setCookies('rdcart', 'rdcart', {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 11 // 11 dias
                    })
                })
                .catch(err => {})
        }
    }, [cart, user])

    const addProduct = (product: ProductInterface) => {
        const cartCopy = [...cart]

        if (user) {
            if (!checkIfProductIsInCart(cartCopy, product)) {
                cartCopy.push(product)
                setCart(cartCopy)
            }
        } else {
            setTempProduct(product)
            Router.push('/auth')
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                tempProduct,
                setTempProduct,
                setCart,
                addProduct
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CountProvider')
    const { cart, tempProduct, setTempProduct, setCart, addProduct } = context
    return { cart, tempProduct, setTempProduct, setCart, addProduct }
}
