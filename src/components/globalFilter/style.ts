import styled from 'styled-components'

export const GlobalFilter = styled.span`
    font-size: 1.6rem;
    font-weight: 700;
    width: 40%;
    display: flex;
    align-items: center;

    span {
        margin-right: 1.2rem;
    }

    input {
        border: 1px solid ${props => props.theme.colors.greyDark3};
    }
`
