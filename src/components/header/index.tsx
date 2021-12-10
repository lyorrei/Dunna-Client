import React, { useEffect, useState } from 'react'

import { useCycle } from 'framer-motion'
import Link from 'next/link'

import {
    Container,
    Img,
    ImageContainer,
    Title,
    ButtonContainer,
    Subtitle
} from './style'
import { RoundedButton } from '../button'
import NextImage from 'next/image'

import Home1 from '../../images/home-1.jpg'
import Home2 from '../../images/home-2.jpg'
import Home3 from '../../images/home-3.jpg'

const containerVariant = {
    animation1: {
        backgroundColor: '#ff8c00',
        transition: {
            duration: 1,
            delay: 2
        }
    },
    animation2: {
        backgroundColor: '#5de7fc',
        transition: {
            duration: 1,
            delay: 2
        }
    },
    animation3: {
        backgroundColor: '#57fa7d',
        transition: {
            duration: 1,
            delay: 2
        }
    }
}

const imageVariants = {
    initial: {
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        zIndex: -1,
        opacity: 0,
        transition: {
            duration: 1
        }
    },
    back: {
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        rotate: 9,
        zIndex: 1,
        opacity: 1,
        transition: {
            duration: 1,
            delay: 2,
            // opacity: {
            //     // delay: 0,
            //     duration: 1
            // },
            top: {
                duration: 0
            },
            left: {
                duration: 0
            }
        }
    },
    middle: {
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        rotate: 0,
        zIndex: 2,
        opacity: 1,

        transition: {
            duration: 1,
            delay: 2
        }
    },
    front: {
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        rotate: -9,
        zIndex: 3,
        opacity: 1,

        transition: {
            duration: 1,
            delay: 2
        }
    },
    offScreen: {
        top: '-50%',
        left: '-50%',
        x: '-50%',
        y: '-50%',
        rotate: -8,
        zIndex: 3,
        opacity: 0,
        transition: {
            delay: 2,
            duration: 1
        }
    }
}

const header: React.FC = () => {
    const [containerAnimation, setContainerAnimation] = useState('animation3')

    const [animation1, cycleAnimation1] = useCycle(
        'back',
        'middle',
        'front',
        'offScreen'
    )
    const [animation2, cycleAnimation2] = useCycle(
        'middle',
        'front',
        'offScreen',
        'back'
    )
    const [animation3, cycleAnimation3] = useCycle(
        'front',
        'offScreen',
        'back',
        'middle'
    )

    useEffect(() => {
        let timer1 = setTimeout(() => {
            cycleAnimation1()
        }, 3000)

        // return () => {
        //     clearTimeout(timer1)
        // }
    }, [animation1])

    useEffect(() => {
        let timer2 = setTimeout(() => {
            cycleAnimation2()
        }, 3000)

        // return () => {
        //     clearTimeout(timer2)
        // }
    }, [animation1])

    useEffect(() => {
        let timer3 = setTimeout(() => {
            cycleAnimation3()
        }, 3000)

        // return () => {
        //     clearTimeout(timer3)
        // }
    }, [animation1])

    useEffect(() => {
        if (animation1 === 'front') {
            setContainerAnimation('animation1')
        } else if (animation2 === 'front') {
            setContainerAnimation('animation2')
        } else if (animation3 === 'front') {
            setContainerAnimation('animation3')
        } else {
            setContainerAnimation('animation3')
        }
    }, [animation1, animation2, animation3])

    return (
        <Container variants={containerVariant} animate={containerAnimation}>
            <Title>
                A joalheria moldada com a arte <span>do Japão</span>
                {/* <Subtitle>
                    Agora no Brasil trazendo conceitos exclusivos da arte de jóias japonesas
                </Subtitle> */}
            </Title>

            <ImageContainer
                variants={imageVariants}
                animate={animation1}
                initial="initial"
            >
                <NextImage
                    layout="fill"
                    src={Home1}
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </ImageContainer>
            <ImageContainer
                variants={imageVariants}
                animate={animation2}
                initial="initial"
            >
                <NextImage
                    layout="fill"
                    src={Home2}
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </ImageContainer>
            <ImageContainer
                variants={imageVariants}
                animate={animation3}
                initial="initial"
            >
                <NextImage
                    layout="fill"
                    src={Home3}
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </ImageContainer>
            <ButtonContainer>
                <Link href="/shop">
                    <RoundedButton>Ver produtos</RoundedButton>
                </Link>
            </ButtonContainer>
        </Container>
    )
}

export default header
