import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 60%;
    padding: 4rem 0;
    margin: 0 auto;

    @media only screen and (max-width: 56.25em) {
        width: 80%;
    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 90%;
    } //600px
`

export const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 5rem;

    @media only screen and (max-width: 75em) {
        font-size: 4rem;
        margin-bottom: 4rem;
    } //1200px
`

export const Obs = styled.p`
    font-size: 1.6rem;
    color: ${props => props.theme.colors.greyDark3};
    margin-bottom: 4rem;

    span {
        color: ${props => props.theme.colors.greyDark2};
        font-weight: 600;
    }
`

export const OrdersContainer = styled.div`
    display: grid;
    grid-gap: 2rem;
`

export const NoOrders = styled.p`
    font-size: 2.4rem;
    color: ${props => props.theme.colors.greyDark2};
    text-align: center;
    margin: 4rem 0;
`
