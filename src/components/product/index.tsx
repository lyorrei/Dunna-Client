import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
    Container,
    Content,
    ImageContainer,
    Price,
    SubPrice,
    Title,
    DiscountBox
} from './style'

import Button from '../button'

import { item, StonesAndShapes } from '../../pages/shop/[type]'

import { useCart, checkIfProductIsInCart } from '../../context/Cart'

import NoImage from '../../images/noimage.png'

export interface ImageProduct {
    _id: string
    product: string
    name: string
    size: number
    key: string
    url: string
    createdAt: string
}

export interface ProductInterface {
    _id: number
    stock_id: number
    name: string
    description: string
    price: number
    discount: boolean
    totalPrice: number
    stone: string & StonesAndShapes & { value: string; label: string }
    stoneWeigth: number
    diamondWeigth: number
    shape: string & StonesAndShapes & { value: string; label: string }
    metal: string & StonesAndShapes & { value: string; label: string }
    productType: string & StonesAndShapes & { value: string; label: string }
    type?: string & StonesAndShapes & { value: string; label: string }
    images?: ImageProduct[]
    spotlight: boolean
    visible: boolean
    notBuyable: boolean
    forMen: boolean
    forWedding: boolean
}

const product: React.FC<ProductInterface> = props => {
    const [isActive, setIsActive] = useState(!props.notBuyable) // False
    const { cart, addProduct } = useCart()
    const [message] = useState(props.notBuyable ? 'Vendido apenas sob consulta' : 'Produto adicionado')

    useEffect(() => {
        if (checkIfProductIsInCart(cart, props)) {
            setIsActive(false)
        } else {
            if (!props.notBuyable) {
                setIsActive(true)
            }
        }
    }, [cart])

    return (
        <Container variants={item}>
            <ImageContainer>
                {props.discount && props.totalPrice && (
                    <DiscountBox>
                        {(100 - (props.price / props.totalPrice) * 100).toFixed(
                            0
                        )}
                        % Off
                    </DiscountBox>
                )}

                <Link href={'/shop/product/' + props._id}>
                    <a>
                        <img
                            src={
                                props.images.length > 0
                                    ? props.images[0]?.url
                                    : NoImage
                            }
                            alt=""
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                        {/* <Image
                                src={
                                    props.images.length > 0
                                        ? props.images[0]?.url
                                        : NoImage
                                }
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            /> */}
                    </a>
                </Link>
            </ImageContainer>
            <Content>
                <Link href={'/shop/product/' + props._id}>
                    <Title>{props.name}</Title>
                </Link>
                <Price>R$ {(props.price / 100).toFixed(2)} </Price>
                <SubPrice>
                    10x de R$ {(props.price / 100 / 10).toFixed(2)} sem juros
                </SubPrice>
                <Button
                    onClick={() => addProduct({ ...props })}
                    disabled={!isActive}
                >
                    {isActive  ? 'Adicionar ao carrinho' : message}
                </Button>
            </Content>
        </Container>
    )
}

export default product
