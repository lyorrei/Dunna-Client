import styled from 'styled-components'

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;

    span {
        font-size: 1.5rem;
        display: inline-block;
        margin-right: 1rem;
        color: ${props => props.theme.colors.greyDark1};
    }
`
