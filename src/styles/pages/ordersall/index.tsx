import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
    padding-top: 2rem;
`

export const Container = styled(motion.div)`
    width: 100%;
    padding: 0 6rem;
    position: relative;
`

export const ActionsTd = styled.p`
    svg {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        transition: all 0.2s;
        fill: #00c0b7;
        margin-left: 2rem;

        &:hover {
            transform: scale(1.1);
        }
    }
`
