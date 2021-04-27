import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled(motion.div)`
    padding: 4rem 16rem;
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);

    @media only screen and (max-width: 75em) {
        padding: 4rem 12rem;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        padding: 4rem 6rem;
    } //900px

    @media only screen and (max-width: 37.5em) {
        padding: 4rem 2rem;
    } //600px
`

export const GridContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    grid-gap: 4rem;
    grid-row-gap: 6rem;
    margin-bottom: 4rem;
`

export const NoProducts = styled.p`
    font-size: 2rem;
    text-align: center;
    margin-top: 4rem;
`
