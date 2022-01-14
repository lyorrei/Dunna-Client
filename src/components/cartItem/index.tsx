import React from 'react'
import Link from 'next/link'
import { useCart } from '../../context/Cart'

import { FaTrash } from 'react-icons/fa'

import {
    Container,
    ImageContainer,
    Img,
    Name,
    Price,
    PriceContainer,
    TotalPrice
} from './style'
import { ProductInterface } from '../product'

interface Props {
    product: ProductInterface
    deletable?: boolean
}

const cartItem: React.FC<Props> = ({ product, deletable }) => {
    const { cart, setCart } = useCart()

    const filterProduct = () => {
        const cartCopy = [...cart]
        const filteredCart = cartCopy.filter(
            filteredProduct => filteredProduct._id !== product._id
        )
        setCart(filteredCart)
    }

    return (
        <Container>
            <Link href={'/shop/product/' + product._id}>
                <ImageContainer>
                    <Img src={product.images[0].url} alt="Product Image" />
                </ImageContainer>
            </Link>
            <Link href={'/shop/product/' + product._id}>
                <Name>{product.name}</Name>
            </Link>
            <PriceContainer>
                {product.discount && product.totalPrice && (
                    <TotalPrice>
                        R$ {(product.totalPrice / 100).toFixed(2)}
                    </TotalPrice>
                )}
                <Price>R$ {(product.price / 100).toFixed(2)}</Price>
            </PriceContainer>
            {deletable && <FaTrash onClick={filterProduct} />}
        </Container>
    )
}

export default cartItem
