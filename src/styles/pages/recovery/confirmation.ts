import styled from 'styled-components'

export const Paragraph = styled.p`
    font-size: 1.8rem;
    margin-bottom: 4rem;
`

export const FormContainer = styled.div`
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: 80% 20%;
    align-items: center;

    @media only screen and (max-width: 37.5em) {
        grid-template-columns: 1fr;
    } //600px
`
