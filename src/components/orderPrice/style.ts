import styled, { css } from 'styled-components'

interface OrderPriceContainerInterface {
    marginBottom?: boolean
    primaryColor?: boolean
    next?: boolean
}

export const OrderPriceContainer = styled.div<OrderPriceContainerInterface>`
    font-size: 2rem;
    font-weight: 600;
    font-family: sans-serif;
    color: ${props => props.theme.colors.greyDark1};
    display: flex;
    margin-top: 4rem;
    align-items: center;
    justify-content: space-between;

    ${props =>
        props.next &&
        css`
            justify-content: left;
        `}

    ${props =>
        props.primaryColor &&
        css`
            color: ${props => props.theme.colors.primaryDark};
        `}

    ${props =>
        props.marginBottom &&
        css`
            margin-bottom: 3rem;
        `}

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-gap: 0.5rem;
        font-weight: 300;

        ${props =>
            props.next &&
            css`
                margin-left: 2rem;
            `}

        ${props =>
            props.primaryColor &&
            css`
                color: ${props => props.theme.colors.greyDark1};
            `}
    }
`

export const NoDiscountPrice = styled.span`
    text-decoration: line-through;
    color: ${props => props.theme.colors.greyDark3};
`
