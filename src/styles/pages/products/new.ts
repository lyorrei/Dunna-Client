import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 100%;
    padding: 10rem 0;
    position: relative;
`

export const ItemContainer = styled(motion.div)`
    position: absolute;
    top: 5%;
    width: 40%;
`
