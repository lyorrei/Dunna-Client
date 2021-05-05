import React, { useRef, useState } from 'react'

import Head from 'next/head'

import { Container, GridContainer } from '../../styles/pages/shop'

import withCart from '../../HOC/withCart'
import ShopCard from '../../components/shopCard'

import Shop1 from '../../images/shop-1.jpg'
import Shop2 from '../../images/shop-2.jpg'
import Shop3 from '../../images/shop-3.jpg'
import Shop4 from '../../images/shop-4.jpg'
import Shop5 from '../../images/shop-7.jpg'
import Shop6 from '../../images/shop-6.jpg'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CenteredTitle } from '../../components/title'

const container = {
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

const titleVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

export const item = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3
        }
    }
}

const shop: React.FC = () => {
    const [items] = useState([
        {
            title: 'Aneis',
            link: '/shop/products/?type=Anel',
            imageUrl: Shop1,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        },
        {
            title: 'Brincos',
            link: '/shop/products/?type=Brinco',
            imageUrl: Shop2,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        },
        {
            title: 'Colares',
            link: '/shop/products/?type=Colar',
            imageUrl: Shop3,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        },
        {
            title: 'Pingentes',
            link: '/shop/products/?type=Pingente',
            imageUrl: Shop4,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        },
        {
            title: 'Pulseiras',
            link: '/shop/products/?type=Pulseira',
            imageUrl: Shop5,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        },
        {
            title: 'Gemas',
            link: '/shop/products/?type=Gema',
            imageUrl: Shop6,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        }
    ])

    return (
        <>
            <Head>
                <title>Dunna - Shop</title>
            </Head>
            <Container variants={container} initial="hidden" animate="visible">
                <CenteredTitle variants={titleVariant}>Dunna - Shop</CenteredTitle>

                <GridContainer>
                    {items.map(card => (
                        <motion.div variants={item} key={card.title}>
                            <Link href={card.link}>
                                <a>
                                    <ShopCard
                                        title={card.title}
                                        link={card.link}
                                        imageUrl={card.imageUrl}
                                        description={card.description}
                                    />
                                </a>
                            </Link>
                        </motion.div>
                    ))} 
                </GridContainer>
            </Container>
        </>
    )
}

export default withCart(shop)
