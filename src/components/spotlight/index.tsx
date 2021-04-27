import React from 'react'

import { GridContainer, NoProducts } from '../../styles/pages/shop/shop'
import { Container } from './style'

import { CenteredTitle } from '../title'
import Product, { ProductInterface } from '../product'

interface Props {
    products: ProductInterface[]
}

const spotlight: React.FC<Props> = ({ products }) => {
    return (
        <Container>
            <CenteredTitle>Destaques</CenteredTitle>
            <GridContainer>
                {products.length > 0 ? (
                    products.map(product => (
                        <Product key={product._id} {...product} />
                    ))
                ) : (
                    <NoProducts>Nenhum produto em destaque</NoProducts>
                )}
            </GridContainer>
        </Container>
    )
}

export default spotlight
