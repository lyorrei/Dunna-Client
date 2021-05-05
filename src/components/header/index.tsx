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

import Home1 from '../../images/home-1.jpg'
import Home2 from '../../images/home-2.jpg'
import Home3 from '../../images/home-3.jpg'

const containerVariant = {
    animation1: {
        backgroundColor: '#B3343B',
        transition: {
            duration: 1,
            delay: 2
        }
    },
    animation2: {
        backgroundColor: '#D6B14C',
        transition: {
            duration: 1,
            delay: 2
        }
    },
    animation3: {
        backgroundColor: '#27B2BE',
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
        rotate: 8,
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
        rotate: -8,
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
        setTimeout(() => {
            cycleAnimation1()
        }, 3000)
    }, [animation1])

    useEffect(() => {
        setTimeout(() => {
            cycleAnimation2()
        }, 3000)
    }, [animation1])

    useEffect(() => {
        setTimeout(() => {
            cycleAnimation3()
        }, 3000)
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
                A nova marca da alta joalheria <span>brasileira</span>
                <Subtitle>
                    Bem vindo a era da nova joalheria artesanal. Estamos aqui
                    para revolucionar o mercado de joias e pedras.
                </Subtitle>
            </Title>

            <ImageContainer
                variants={imageVariants}
                animate={animation1}
                initial="initial"
            >
                <Img src={Home1} />
            </ImageContainer>
            <ImageContainer
                variants={imageVariants}
                animate={animation2}
                initial="initial"
            >
                <Img src={Home2} />
            </ImageContainer>
            <ImageContainer
                variants={imageVariants}
                animate={animation3}
                initial="initial"
            >
                <Img src={Home3} />
            </ImageContainer>
            <ButtonContainer>
                <Link href="/shop">
                    <RoundedButton>Comprar agora</RoundedButton>
                </Link>
            </ButtonContainer>
        </Container>
    )
}

export default header
