import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.greyLight4};
    overflow: hidden;
    transition: all 0.2s;
    padding: 4rem;

    @media only screen and (max-width: 37.5em) {
        padding: 2rem;
    } //600px
`

export const ImageContainer = styled.div`
    height: 30rem;

    border-radius: ${props => props.theme.sizes.borderRadius};
    transition: all .2s;
    position: relative;

    &:hover {
        transform: scale(1.05)
    }

    @media only screen and (max-width: 37.5em) {
        height: 25rem;
    } //600px
`

export const Content = styled.div`
    color: ${props => props.theme.colors.greyDark1};
    margin-top: 2rem;
`

export const Title = styled.h2`
    font-size: 2.5rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 400;
    transform-origin: 0;

`

export const Price = styled.p`
    font-size: 1.8rem;
    font-weight: 300;
    margin-top: 1.5rem;
    font-family: sans-serif;
`
