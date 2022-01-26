import styled from 'styled-components'

export const UserContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: stretch;
    grid-gap: 2rem;
    justify-items: stretch;
`

export const Paragraph = styled.p`
    font-size: 1.6rem;
    font-family: sans-serif;
    span {
        font-weight: 600;
        margin-right: 1rem;
        display: inline-block;
    }
`
