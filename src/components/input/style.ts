import styled from 'styled-components'

export const Input = styled.input`
    display: block;
    padding: 0.8rem 1rem;
    font-family: 'Raleway', sans-serif;

    width: 100%;
    background-color: ${props => props.theme.colors.white};

    font-size: 1.6rem;
    color: ${props => props.theme.colors.greyDark1};
    border: none;

    border-bottom: 1px solid ${props => props.theme.colors.greyDark3};
    border-radius: 3px;
    outline: none;
`

export const Label = styled.label`
    font-size: 1.5rem;
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 400;
`

export const Error = styled.span`
    display: block !important;
    color: red !important;
    margin-top: 1rem !important;
    font-size: 1.4rem !important;
`
