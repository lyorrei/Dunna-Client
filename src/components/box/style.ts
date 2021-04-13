import { motion } from 'framer-motion'
import styled from 'styled-components'

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
    }

    p {
        font-size: 1.5rem;
        color: ${props => props.theme.colors.greyDark2};
    }
`
