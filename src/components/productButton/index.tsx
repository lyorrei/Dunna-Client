import React, { useEffect, useState } from 'react'
import { checkIfProductIsInCart, useCart } from '../../context/Cart'
import Button from '../button'
import { ProductInterface } from '../product'

interface Props {
    product: ProductInterface
}

const productButton: React.FC<Props> = ({ product }) => {
    const { cart, addProduct } = useCart()

    const [isActive, setIsActive] = useState(
        !product.notBuyable && !product.sold
    )

    useEffect(() => {
        if (checkIfProductIsInCart(cart, product)) {
            setIsActive(false)
        } else {
            if (!product.notBuyable && !product.sold) {
                setIsActive(true)
            }
        }
    }, [cart])

    let message = ''
    if (product.notBuyable) {
        message = 'Vendido apenas sob consulta'
    } else {
        message = 'Produto adicionado'
    }
    if (product.sold) {
        message = 'Produto vendido'
    }

    return (
        <Button onClick={() => addProduct(product)} disabled={!isActive}>
            {isActive ? 'Adicionar à sacola' : message}
        </Button>
    )
}

export default productButton
