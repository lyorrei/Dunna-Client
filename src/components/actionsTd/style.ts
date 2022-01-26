import styled from 'styled-components'

export const ActionsTd = styled.p`
    display: flex;
    grid-gap: 0.6rem;

    svg {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.1);
        }
    }
`
