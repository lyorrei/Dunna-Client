import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Container, Content, ImageContainer, Price, Title } from './style'

import Button, { InlineButton } from '../button'

import { item, StonesAndShapes } from '../../pages/shop/products'

import { useCart, checkIfProductIsInCart } from '../../context/Cart'

import Image from 'next/image'

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
    stone: string & StonesAndShapes & { value: string; label: string }
    stoneWeigth: number
    diamondWeigth: number
    shape: string & StonesAndShapes & { value: string; label: string }
    metal: string & StonesAndShapes & { value: string; label: string }
    productType: string & StonesAndShapes & { value: string; label: string }
    images?: ImageProduct[]
}

const product: React.FC<ProductInterface> = props => {
    const [isActive, setIsActive] = useState(true)
    const { cart, addProduct } = useCart()

    useEffect(() => {
        if (checkIfProductIsInCart(cart, props)) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }, [cart])

    return (
        <Container variants={item}>
            <ImageContainer>
                <Link href={'/shop/' + props._id}>
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
                <Link href={'/shop/' + props._id}>
                    <Title>{props.name}</Title>
                </Link>
                <Price>R$ {(props.price / 100).toFixed(2)}</Price>
                <Button
                    onClick={() => addProduct({ ...props })}
                    disabled={!isActive}
                >
                    {isActive ? 'Adicionar ao carrinho' : 'Produto adicionado'}
                </Button>
            </Content>
        </Container>
    )
}

export default product
