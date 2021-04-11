import styled from 'styled-components'

export const ButtonContainer = styled.div`
    display: flex;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    /* width: 15rem; */
    justify-content: flex-end;

    button {
        width: 15rem;
    }
`

export const Paragraph = styled.p`
    font-size: 1.6rem;
    margin-bottom: 3rem;
`
