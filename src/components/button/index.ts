import styled, {
    css,
    DefaultTheme,
    ThemedStyledFunction
} from 'styled-components'

const Button = styled.button`
    margin-top: 2rem;
    display: block;
    width: 100%;
    padding: 1.5rem 0;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${props => props.theme.colors.white};
    font-size: 1.8rem;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    cursor: pointer;
    transition: all 1s;
    --webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: all 0.2s;

    @media only screen and (max-width: 37.5em) {
        padding: 1.2rem 0;
        font-size: 1.6rem;
    } //600px

    &:hover {
        transform: translateY(-0.5rem);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.colors.greyLight4};
    }
`

interface InlineButtonProps {
    light?: boolean
}

export const InlineButton = styled(Button)<InlineButtonProps>`
    display: inline-block;
    padding: 1.5rem 2.5rem !important;
    border-radius: 1rem;
    margin-top: 0;

    @media only screen and (max-width: 37.5em) {
        padding: 1.2rem 2rem !important;
    } //600px

    ${props =>
        props.light &&
        css`
            background-color: ${({ theme }) =>
                theme.colors.greyLight3} !important;
            color: ${({ theme }) => theme.colors.greyDark1} !important;
        `}
`

export const CheckoutButton = styled(Button)`
    border-radius: 3px 2rem 3px 2rem !important;
`

export const RoundedButton = styled.button`
    font-size: 1.8rem;
    padding: 2rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.white};
    font-family: 'Raleway', sans-serif;
    background: none;
    color: ${props => props.theme.colors.white};
    margin: 0 auto;
    display: block;
    width: 18rem;
    height: 18rem;
    cursor: pointer;
    outline: none;
    transition: all 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`

export const EditButton = styled.button`
    width: 10rem;
    padding: 1rem 1.5rem;
    cursor: pointer;
    border: 1px solid ${props => props.theme.colors.greyLight4};
    border-radius: 3px;
    font-family: 'Raleway', sans-serif;
    font-size: 1.5rem;
    outline: none;

    &:hover {
        background-color: ${props => props.theme.colors.greyLight1};
    }
`

export default Button
