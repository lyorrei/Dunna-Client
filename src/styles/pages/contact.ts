import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 60%;
    padding: 4rem 0;
    margin: 0 auto;
`

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 4rem;
`

export const Paragraph = styled.p`
    font-size: 2rem;
    color: ${props => props.theme.colors.greyDark2};
    margin-bottom: 4rem;
`

export const CommunicationContainer = styled.div`
    margin-bottom: 4rem;
`

export const CommunicationBox = styled.div`
    font-size: 1.8rem;
    font-family: sans-serif;
    margin-bottom: 1rem;

    span {
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
    }
`
