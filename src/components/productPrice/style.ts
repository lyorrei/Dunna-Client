import styled from 'styled-components'
import { UppercaseText } from '../../styles/pages/shop/product'

export const Price = styled.span`
    font-family: sans-serif;
    color: ${props => props.theme.colors.primary};
    font-size: 4rem;
    position: relative;
    margin: 0 6rem;
    margin-bottom: 2rem;
    display: inline-block;

    @media only screen and (max-width: 75em) {
        font-size: 3.4rem;
    } //1200px
`

export const DicountTotalPrice = styled.p`
    font-weight: 300;
    font-family: sans-serif;
    color: ${props => props.theme.colors.backgroundDark};
    font-size: 1.6rem;

    span {
        color: ${props => props.theme.colors.primary};
    }
`



export const PriceSpan = styled(UppercaseText)`
    position: absolute;
    top: 0.6rem;
    left: -2.8rem;
    font-size: 1.8rem;
`

export const SubPrice = styled.p`
    color: ${props => props.theme.colors.backgroundDark};
    font-size: 1.6rem;
    font-weight: 300;
`
