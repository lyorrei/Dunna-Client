import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import {
    Container,
    BigImageContainer,
    SmallImageContainer,
    Img,
    LeftContainer,
    RightContainer,
    Description,
    Price,
    Span,
    Title,
    UppercaseText,
    PriceSpan,
    SelectableImage,
    GridContainer,
    CheckList
} from '../../styles/pages/shop/product'

import Head from 'next/head'
import { ProductInterface } from '../../components/product'
import { InlineButton } from '../../components/button'
import { FiCheckCircle } from 'react-icons/fi'

import ReactImageMagnify from 'react-image-magnify'
import { checkIfProductIsInCart, useCart } from '../../context/Cart'
import withCart from '../../HOC/withCart'

import NoImage from '../../images/noimage.png'
import { FaWeight } from 'react-icons/fa'
import { RiVipDiamondLine } from 'react-icons/ri'
import { FaShapes } from 'react-icons/fa'

import { useRouter } from 'next/router'
import { CircleLoader } from 'react-spinners'
import { GiMetalBar, GiStoneBlock, GiStoneSphere } from 'react-icons/gi'

import { getProducts, getSingleProduct } from '../../../server/src/common'

import Product from '../../../server/src/models/product'
import { GetStaticPaths } from 'next'

interface Props {
    product: ProductInterface
}

const containerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
}

const BigImageVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

const SmallImageVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
}

const RightContainerVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6
        }
    }
}

const product: React.FC<Props> = ({ product }) => {
    const router = useRouter()
    if (router.isFallback) {
        return (
            <Container
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <div style={{ margin: '8rem auto', width: '120px' }}>
                    <CircleLoader color={'#00c2a8'} size={120} />
                </div>
            </Container>
        )
    }

    const [selectedImage, setSelectedImage] = useState(
        product.images.length > 0 ? product.images[0].url : NoImage
    )
    const { cart, addProduct } = useCart()
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        if (checkIfProductIsInCart(cart, product)) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }, [cart])

    return (
        <>
            <Head>
                <title>Produto - {product.name}</title>
            </Head>
            <Container
                variants={containerVariant}
                initial="hidden"
                animate="visible"
            >
                <GridContainer>
                    <LeftContainer>
                        <BigImageContainer variants={BigImageVariant}>
                            <ReactImageMagnify
                                enlargedImagePosition="over"
                                largeImage={{
                                    src: selectedImage,
                                    width: 2400,
                                    height: 1800
                                }}
                                smallImage={{
                                    alt: 'Image',
                                    isFluidWidth: true,
                                    src: selectedImage
                                }}
                                imageStyle={{ borderRadius: '2rem' }}
                            />
                        </BigImageContainer>
                        <SmallImageContainer
                            variants={SmallImageVariant}
                            imagesNumber={
                                product.images.length > 0
                                    ? product.images.length
                                    : 3
                            }
                        >
                            {product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <SelectableImage
                                        src={image.url}
                                        alt={'Image ' + index}
                                        key={image._id}
                                        onClick={() =>
                                            setSelectedImage(image.url)
                                        }
                                        active={image.url === selectedImage}
                                    />
                                ))
                            ) : (
                                <SelectableImage
                                    src={NoImage}
                                    alt={'noImage'}
                                    key={'noImage'}
                                    onClick={() => {}}
                                    active={true}
                                />
                            )}
                        </SmallImageContainer>
                    </LeftContainer>
                    <RightContainer variants={RightContainerVariant}>
                        <Title>{product.name}</Title>
                        <UppercaseText>
                            By <Span>Dunna Jewelry</Span>
                        </UppercaseText>
                        <Price>
                            <PriceSpan>R$</PriceSpan>
                            {(product.price / 100).toFixed(2)}
                        </Price>
                        <Description>{product.description}</Description>
                        <InlineButton
                            onClick={() => addProduct(product)}
                            disabled={!isActive}
                        >
                            {isActive
                                ? 'Adicionar ao carrinho'
                                : 'Produto adicionado'}
                        </InlineButton>

                        <CheckList>
                            <li>
                                <GiStoneSphere />
                                <span>Tipo: {product.productType.name}</span>
                            </li>
                            <li>
                                <GiStoneBlock />
                                <span>Pedra: {product.stone.name}</span>
                            </li>

                            {product.stoneWeigth && product.stoneWeigth > 0 ? (
                                <li>
                                    <FaWeight />
                                    <span>
                                        Peso da Pedra: {product.stoneWeigth} ct
                                    </span>
                                </li>
                            ) : null}

                            {product.diamondWeigth &&
                            product.diamondWeigth > 0 ? (
                                <li>
                                    <RiVipDiamondLine />
                                    <span>
                                        Peso do diamante:{' '}
                                        {product.diamondWeigth} ct
                                    </span>
                                </li>
                            ) : null}

                            <li>
                                <FaShapes />
                                <span>Formato: {product.shape.name}</span>
                            </li>
                            {product.metal && (
                                <li>
                                    <GiMetalBar />
                                    <span>Metal: {product.metal.name}</span>
                                </li>
                            )}
                        </CheckList>
                    </RightContainer>
                </GridContainer>
            </Container>
        </>
    )
}

export const getServerSideProps = async ctx => {
    const product = JSON.parse(
        JSON.stringify(await getSingleProduct(ctx.params.id))
    )
    return { props: { product } }
}

export default withCart(product)
