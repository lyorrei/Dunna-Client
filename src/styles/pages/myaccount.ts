import styled from 'styled-components'
import { motion } from 'framer-motion'

export const PageContainer = styled(motion.div)`
    min-height: calc(100vh - 6rem);
    background-color: ${props => props.theme.colors.white};
`
export const Container = styled(motion.div)`
    width: 60vw;
    padding: 4rem 0;
    margin: 0 auto;
    display: grid;
    grid-gap: 4rem;

    @media only screen and (max-width: 37.5em) {
        width: 80vw;
    } //600px
`

export const Title = styled(motion.h2)`
    font-size: 3.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};

    @media only screen and (max-width: 37.5em) {
        font-size: 3rem;
    } //600px
`

export const Item = styled(motion.div)`
    border: 1px solid ${props => props.theme.colors.greyLight4};
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 3rem;
    transition: all 0.2s;
    cursor: pointer;

    @media only screen and (max-width: 37.5em) {
        padding: 2.4rem;
    } //600px

    &:hover {
        background-color: ${props => props.theme.colors.greyLight2};
    }

    svg {
        width: 8rem;
        height: 8rem;
        fill: ${props => props.theme.colors.primary};
        margin-right: 3rem;

        @media only screen and (max-width: 37.5em) {
            margin-right: 2rem;
            width: 6rem;
            height: 6rem;
        } //600px
    }

    h4 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.colors.greyDark1};

        @media only screen and (max-width: 37.5em) {
            font-size: 2.4rem;
        } //600px
    }

    p {
        font-size: 1.5rem;
        color: ${props => props.theme.colors.greyDark2};
    }
`
