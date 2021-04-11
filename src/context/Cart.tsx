import React, { createContext, useState, useContext, useEffect } from 'react'
import { ProductInterface } from '../components/product'

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

    const addProduct = (product: ProductInterface) => {
        const cartCopy = [...cart]

        if (!checkIfProductIsInCart(cartCopy, product)) {
            cartCopy.push(product)
            setCart(cartCopy)
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
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
    const { cart, setCart, addProduct } = context
    return { cart, setCart, addProduct }
}
