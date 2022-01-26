import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    padding: 4rem 12rem;
    min-height: calc(100vh - 6rem);

    @media only screen and (max-width: 112.5em) {
        padding: 4rem 8rem;
    } //1800px

    @media only screen and (max-width: 75em) {
        padding: 4rem 4rem;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        padding: 4rem 8rem;
    } //900px

    @media only screen and (max-width: 37.5em) {
        padding: 4rem;
    } //600px
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;

    @media only screen and (max-width: 56.25em) {
        grid-template-columns: 1fr;
    } //900px
`

export const LeftContainer = styled.div`
    z-index: 1;
`

export const RightContainer = styled(motion.div)`
    padding: 2rem;

    @media only screen and (max-width: 56.25em) {
        grid-row: 1 / 2;
    } //900px
`

export const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 1.5rem;
    transition: all 0.2s;

    @media only screen and (max-width: 75em) {
        font-size: 3.8rem;
    } //1200px

    &:hover {
        transform: scale(1.05);
    }
`

export const UppercaseText = styled.p`
    color: ${props => props.theme.colors.backgroundDark};
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 2rem;

    span {
        color: ${props => props.theme.colors.primary};
    }
`

export const Description = styled.p`
    font-size: 2rem;
    color: ${props => props.theme.colors.greyDark2};
    margin-bottom: 4rem;
`

export const NotBuyableText = styled.p`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
`

export const EditDiv = styled.div`
    a {
        margin-top: 2rem;
        display: inline-block;
        width: 40%;
        padding: 1.5rem 0;
        border: none;
        outline: none;
        background-color: ${props => props.theme.colors.blue};
        color: ${props => props.theme.colors.white};
        font-size: 1.8rem;
        border-radius: ${({ theme }) => theme.sizes.borderRadius};
        cursor: pointer;
        transition: all 1s;
        --webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transition: all 0.2s;
        text-align: center;
        float: right;
        text-decoration: none;

        &:hover {
            transform: scale(1.05);
        }
    }
`
