import styled from 'styled-components'

export const Paragraph = styled.p`
    font-size: 1.8rem;
    margin-bottom: 4rem;
`

export const FormContainer = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    align-items: center;

    margin-bottom: 4rem;

    @media only screen and (max-width: 37.5em) {
        grid-template-columns: 1fr;
        grid-gap: 4rem;
    } //600px
`
