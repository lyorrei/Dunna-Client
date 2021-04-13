import { motion } from 'framer-motion';
import styled from 'styled-components';

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
