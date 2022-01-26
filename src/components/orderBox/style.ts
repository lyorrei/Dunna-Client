import styled from 'styled-components'

export const OrderBox = styled.div`
    border: 1px solid ${props => props.theme.colors.greyDark3};
`

export const OrderHeader = styled.div`
    background-color: ${props => props.theme.colors.greyLight3};
    padding: 2rem;
    display: flex;

    @media only screen and (max-width: 75em) {
        padding: 1rem;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        flex-direction: column;
    } //900px
`

const HeaderElement = styled.p`
    color: ${props => props.theme.colors.greyDark2};
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;

    font-family: sans-serif;
    letter-spacing: 0.1rem;

    @media only screen and (max-width: 56.25em) {
        margin-bottom: 1rem;
    } //900px

    span {
        margin-bottom: 0.8rem;
        text-transform: uppercase;
        color: ${props => props.theme.colors.greyDark1};

        @media only screen and (max-width: 56.25em) {
            margin-bottom: 0;
        } //900px
    }
`

export const DateParagraph = styled(HeaderElement)`
    margin-right: 4rem;
    flex: 0 0 14%;
`

interface TotalInterface {
    coupon?: boolean
}

export const Total = styled(HeaderElement)<TotalInterface>`
    margin-right: auto;

    ${props => props.coupon && 'margin-right: 6rem;'}
`

export const Coupon = styled(HeaderElement)`
    margin-right: auto;
`

export const UntilDate = styled(HeaderElement)``

export const OrderBody = styled.div`
    padding: 2rem;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 75em) {
        padding: 1rem;
        flex-direction: column;
        align-items: stretch;
    } //1200px
`

export const ItensContainer = styled.div`
    flex: 0 0 50%;
    margin-right: 2rem;

    @media only screen and (max-width: 75em) {
        margin-right: 0;
        margin-bottom: 2rem;
    } //1200px
`
