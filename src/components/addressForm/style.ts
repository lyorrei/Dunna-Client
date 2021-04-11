import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Form as Unform } from '@unform/web'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 30%;
    padding: 4rem 0;
    margin: 0 auto;

    @media only screen and (max-width: 75em) {
        width: 50%;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        width: 60%;
    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 70%;
    } //600px

    @media only screen and (max-width: 25em) {
        width: 80%;
    } //400px
`

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 4rem;

    @media only screen and (max-width: 37.5em) {
        font-size: 3rem;
        margin-bottom: 3rem;
    } //600px
`

export const SideBySide = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;

    @media only screen and (max-width: 37.5em) {
        grid-template-columns: 1fr;
        grid-gap: 2rem;
    } //600px
`

interface FormProps {
    loading: number
}

export const Form = styled(Unform)<FormProps>`
    display: grid;
    grid-gap: 2.5rem;
    align-items: center;

    p {
        font-size: 1.8rem;
        letter-spacing: 0.1rem;

        @media only screen and (max-width: 37.5em) {
            font-size: 1.6rem;
        } //600px
    }

    ${props => props.loading && 'display: none;'}
`
