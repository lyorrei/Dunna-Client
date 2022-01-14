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
    const isInCart = cart.some(
        productFromCart => productFromCart._id === product._id
    )
    return isInCart
}

export default function CountProvider({ children }) {
    const [cart, setCart] = useState([])
    const [cartPrice, setCartPrice] = useState(0) // Valor do carrinho com desconto
    const [cartNoDiscountPrice, setCartNoDiscountPrice] = useState(0) // Valor do carrinho sem desconto
    const [cartDiscount, setCartDiscount] = useState(0) // Valor do desconto
    const [tempProduct, setTempProduct] = useState(null)
    const [coupon, setCoupon] = useState(null)

    const { user } = useUser()
    const [cookies, setCookies] = useCookies(['rdcart'])
    const Router = useRouter()

    useEffect(() => {
        let priceWithDiscount = 0
        let discount = 0
        let priceWithoutDiscount = 0

        for (let i = 0; i < cart.length; i++) {
            priceWithDiscount += cart[i].price

            if (cart[i].discount && cart[i].totalPrice) {
                priceWithoutDiscount += cart[i].totalPrice
                discount += cart[i].totalPrice - cart[i].price
            } else {
                priceWithoutDiscount += cart[i].price
            }
        }
        setCartPrice(priceWithDiscount)
        setCartDiscount(discount)
        setCartNoDiscountPrice(priceWithoutDiscount)
    }, [cart])

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
            if (
                !checkIfProductIsInCart(cartCopy, product) &&
                !product.notBuyable &&
                !product.sold
            ) {
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
                cartPrice,
                tempProduct,
                setTempProduct,
                setCart,
                addProduct,
                setCoupon,
                cartNoDiscountPrice,
                cartDiscount,
                coupon
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CountProvider')
    const {
        cart,
        cartPrice,
        tempProduct,
        setTempProduct,
        setCart,
        addProduct,
        setCoupon,
        cartNoDiscountPrice,
        cartDiscount,
        coupon
    } = context
    return {
        cart,
        cartPrice,
        tempProduct,
        setTempProduct,
        setCart,
        addProduct,
        setCoupon,
        cartNoDiscountPrice,
        cartDiscount,
        coupon
    }
}
