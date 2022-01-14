import styled from 'styled-components';

export const Label = styled.label`
    font-size: 1.5rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 400;
`

export const Error = styled.span`
    display: block;
    color: red;
    margin-top: 1rem;
    font-size: 1.4rem;
`
