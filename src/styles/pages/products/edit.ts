import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 40%;
    padding: 6rem 0;
    margin: 0 auto;
    /* position: relative; */
`


