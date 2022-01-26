import styled from 'styled-components'
import { motion } from 'framer-motion'

export const BigImageContainer = styled(motion.div)`
    margin-bottom: 3rem;
    border-radius: 2rem;

    @media only screen and (max-width: 112.5em) {
        margin-bottom: 1.5rem;
    } //1800px
`

interface SmallImageContainerProps {
    imagesNumber: number
}

export const SmallImageContainer = styled(motion.div)<SmallImageContainerProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.imagesNumber}, 1fr);
    grid-gap: 3rem;
    max-height: 22vh;

    @media only screen and (max-width: 112.5em) {
        grid-gap: 1.5rem;
    } //1800px
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
`

interface SelectableImageProps {
    active: boolean
}

export const SelectableImage = styled(Img)<SelectableImageProps>`
    cursor: pointer;
    height: 22vh;

    ${props =>
        props.active && 'border: .3rem solid ' + props.theme.colors.primary}
`
