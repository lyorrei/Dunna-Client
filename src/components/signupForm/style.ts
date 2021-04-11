import styled from 'styled-components'

export const InputGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;

    @media only screen and (max-width: 37.5em) {
        grid-template-columns: 1fr;
    } //600px
`
