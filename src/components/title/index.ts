import { motion } from 'framer-motion'
import styled from 'styled-components'

const Title = styled.h2`
    font-size: 4.5rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 5rem;

    @media only screen and (max-width: 75em) {
        font-size: 4rem;
        margin-bottom: 4rem;
    } //1200px
`

export const CenteredTitle = styled(motion.h2)`
    text-transform: uppercase;
    color: ${props => props.theme.colors.greyDark1};
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    padding-top: 2rem;
    margin-bottom: 6rem;

    @media only screen and (max-width: 56.25em) {
        font-size: 3rem;
        margin-bottom: 4rem;
    } //900px
`

export default Title
