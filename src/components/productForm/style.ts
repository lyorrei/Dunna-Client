import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Form as Unform } from '@unform/web'

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 4rem;
`

export const SideBySide = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
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
    }

    ${props => props.loading && 'display: none;'}
`

