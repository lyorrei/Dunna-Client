import styled, { css } from 'styled-components'
import { Box } from '../../styles/pages/checkout'

const Scroll = css`
    padding-right: 3rem;

    @media only screen and (max-width: 37.5em) {
        padding-right: 2rem;
    } //600px

    @media only screen and (max-width: 25em) {
        padding-right: 1rem;

    } //400px

    /* width */
    ::-webkit-scrollbar {
        width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.5rem grey;
        border-radius: 1rem;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.primary};
        border-radius: 1rem;
    }
`

export const Cart = styled(Box)`
    top: 5%;
    left: 60%;
    width: 24%;
    background-color: #fff; // #7a8696; // lighten(#636d7a, 80%);

    @media only screen and (max-width: 112.5em) {
        padding: 2rem;
    } //1800px

    @media only screen and (max-width: 75em) {
        top: 5%;
        left: 13rem;
        width: 75%;
    } //1200px

    @media only screen and (max-width: 37.5em) {
        width: 90%;
        left: 5%;
    } //600px

    /* @media only screen and (max-width: 112.5em) {
    left: 55%;
    width: 24%;
    } //1800px */
`

export const CartItemContainer = styled.div`
    max-height: 20rem;
    overflow-y: auto;
    display: grid;
    grid-gap: 2rem;
    align-items: center;
    justify-items: center;

    ${Scroll}
`

export const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ImageContainer = styled.div`
    width: 20%;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
`

export const Name = styled.p`
    font-size: 1.6rem;
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 700;
    flex: 0 0 50%;

`

export const Price = styled.p`
    font-size: 1.5rem;
    color: ${props => props.theme.colors.greyDark1};
    font-family: sans-serif;

`

export const Total = styled.p`
    font-size: 2rem;
    font-weight: 600;
    font-family: sans-serif;
    color: ${props => props.theme.colors.greyDark1};
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
`
