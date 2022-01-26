import React from 'react'
import { ProductInterface } from '../product'
import { DicountTotalPrice, Price, PriceSpan, SubPrice } from './style'

interface Props {
    product: ProductInterface
}

const productPrice: React.FC<Props> = ({ product }) => {

    if (product.discount) {
        return (
            <>
                <DicountTotalPrice>
                    De R$ <span>{(product.totalPrice / 100).toFixed(2)}</span>{' '}
                    para
                </DicountTotalPrice>
                <Price>
                    <PriceSpan>R$</PriceSpan>
                    {(product.price / 100).toFixed(2)}
                    <SubPrice>
                        10x sem juros de R${' '}
                        {(product.price / 100 / 10).toFixed(2)}
                    </SubPrice>
                </Price>
            </>
        )
    }

    return (
        <Price>
            <PriceSpan>R$</PriceSpan>
            {(product.price / 100).toFixed(2)}
            <SubPrice>
                10x sem juros de R$ {(product.price / 100 / 10).toFixed(2)}
            </SubPrice>
        </Price>
    )
}

export default productPrice
