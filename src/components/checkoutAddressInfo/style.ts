import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Box } from '../../styles/pages/checkout'

export const Container = styled(Box)`
    top: 60%;
    left: 60%;
    background-color: ${props => props.theme.colors.white};

    p {
        color: ${props => props.theme.colors.greyDark1};
        font-size: 1.6rem;
        font-family: sans-serif;
        line-height: 2;
    }

    @media only screen and (max-width: 75em) {
       display:none;
       visibility: hidden;
    } //1200px
`

export const UserInfo = styled.p`
    font-weight: 700;
    margin-bottom: 1rem;
`;

export const Title = styled.h3`
    font-size: 3rem;
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 300;
    margin-bottom: 2rem;
`
