import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HeaderContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.primary};
`

export const PageContainer = styled.div`
    background-color: ${props => props.theme.colors.white};
`
