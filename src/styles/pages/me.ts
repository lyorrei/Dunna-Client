import styled from 'styled-components'

import { motion } from 'framer-motion'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 40%;
    padding: 4rem 0;
    margin: 0 auto;

    @media only screen and (max-width: 75em) {
        width: 60%;

    } //1200px

    @media only screen and (max-width: 56.25em) {
        width: 75%;

    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 90%;

    } //600px
`

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
`

export const SubContainer = styled.div`
    margin-top: 4rem;
    border: 1px solid ${props => props.theme.colors.greyLight4};
    margin-bottom: 3rem;
`

interface Props {
    loading: number
}

export const IsLoading = styled.div<Props>`
    ${props => props.loading && 'display: none;'};
`
