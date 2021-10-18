import React from 'react'
import Link from 'next/link'
import { useCart } from '../../context/Cart'

import { FaTrash } from 'react-icons/fa'

import { Container, ImageContainer, Img, Name, Price } from './style'
import { ProductInterface } from '../product'

const cartItem: React.FC<ProductInterface> = props => {
    const { cart, setCart } = useCart()

    const filterProduct = () => {
        const cartCopy = [...cart]
        const filteredCart = cartCopy.filter(
            product => product._id !== props._id
        )
        setCart(filteredCart)
    }

    return (
        <Container>
            <Link href={'/shop/product/' + props._id}>
                <ImageContainer>
                    <Img src={props.images[0].url} alt="Product Image" />
                </ImageContainer>
            </Link>
            <Link href={'/shop/product/' + props._id}>
                <Name>{props.name}</Name>
            </Link>
            <Price>R$ {(props.price / 100).toFixed(2)}</Price>
            <FaTrash onClick={filterProduct} />
        </Container>
    )
}

export default cartItem
