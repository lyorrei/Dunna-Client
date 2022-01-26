import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import ReactImageMagnify from 'react-image-magnify'
import { ProductInterface } from '../product'

import { BigImageContainer, SelectableImage, SmallImageContainer } from './style'

import NoImage from '../../images/noimage.png'

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

interface Props {
    product: ProductInterface
}

const productImage: React.FC<Props> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(
        product.images.length > 0 ? product.images[0].url : NoImage
    )
    const [selectedWidth, setSelectedWidth] = useState(null)
    const [selectedHeight, setSelectedHeight] = useState(null)

    const router = useRouter()

    // SET IMAGE DIMENSIONS
    useEffect(() => {
        const img = new Image()
        img.onload = function () {
            if (img.width < 1400) {
                setSelectedWidth(img.width * 2)
                setSelectedHeight(img.height * 2)
            } else {
                setSelectedWidth(img.width)
                setSelectedHeight(img.height)
            }
        }
        img.src = selectedImage
    }, [selectedImage])

    // Fix problem when changing page
    useEffect(() => {
        setSelectedImage(
            product.images.length > 0 ? product.images[0].url : NoImage
        )
    }, [router.asPath])

    return (
        <>
            <BigImageContainer variants={BigImageVariant}>
                <ReactImageMagnify
                    enlargedImagePosition="over"
                    largeImage={{
                        src: selectedImage,
                        width: selectedWidth ? selectedWidth : 2400,
                        height: selectedHeight ? selectedHeight : 1800
                    }}
                    smallImage={{
                        alt: 'Image',
                        isFluidWidth: true,
                        src: selectedImage
                    }}
                    imageStyle={{
                        borderRadius: '2rem',
                        maxHeight: '60vh',
                        objectFit: 'cover'
                    }}
                />
            </BigImageContainer>
            <SmallImageContainer
                variants={SmallImageVariant}
                imagesNumber={
                    product.images.length > 0 ? product.images.length : 3
                }
            >
                {product.images.length > 0 ? (
                    product.images.map((image, index) => (
                        <SelectableImage
                            src={image.url}
                            alt={'Image ' + index}
                            key={image._id}
                            onClick={() => setSelectedImage(image.url)}
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
        </>
    )
}

export default productImage
