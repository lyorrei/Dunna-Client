import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    padding: 4rem 12rem;
    min-height: calc(100vh - 6rem);
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
`

export const LeftContainer = styled.div`
    z-index: 1;
`

export const BigImageContainer = styled(motion.div)`
    height: 54rem;
    margin-bottom: 3rem;
    overflow: hidden;
    border-radius: 2rem;
`

interface SmallImageContainerProps {
    imagesNumber: number
}

export const SmallImageContainer = styled(motion.div)<SmallImageContainerProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.imagesNumber}, 1fr);
    height: 20rem;
    grid-gap: 3rem;
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
    height: 18rem;
    cursor: pointer;
    ${props =>
        props.active && 'border: .3rem solid ' + props.theme.colors.primary}
`

export const RightContainer = styled(motion.div)`
    padding: 2rem;
`

export const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 1.5rem;
    transition: all 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`

export const UppercaseText = styled.p`
    color: ${props => props.theme.colors.backgroundDark};
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
`

export const Span = styled.span`
    color: ${props => props.theme.colors.primary};
`

export const Price = styled.span`
    font-family: sans-serif;
    color: ${props => props.theme.colors.primary};
    font-size: 4rem;
    position: relative;
    margin: 4rem 4rem;
    display: inline-block;
`

export const PriceSpan = styled(UppercaseText)`
    position: absolute;
    top: 0.6rem;
    left: -2.8rem;
    font-size: 1.8rem;
`

export const Description = styled.p`
    font-size: 2rem;
    color: ${props => props.theme.colors.greyDark2};
    margin-bottom: 4rem;
`

export const CheckList = styled.ul`
    margin-top: 3.4rem;
    list-style-type: none;
    font-style: none;

    li {
        padding: 0.5rem 0;
        display: flex;
        align-items: center;

        svg {
            color: ${props => props.theme.colors.primary};
            width: 1.6rem;
            height: 1.6rem;
        }

        span {
            margin-left: 0.8rem;
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.backgroundDark};
        }
    }
`
