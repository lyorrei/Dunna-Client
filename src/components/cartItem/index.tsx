import React from 'react'
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
            <ImageContainer>
                <Img src={props.images[0].url} alt="Product Image" />
            </ImageContainer>
            <Name>{props.name}</Name>
            <Price>R$ {(props.price / 100).toFixed(2)}</Price>
            <FaTrash onClick={filterProduct} />
        </Container>
    )
}

export default cartItem
