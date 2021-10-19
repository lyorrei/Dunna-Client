import styled from 'styled-components'

export const Message = styled.p`
    font-size: 1.6rem;
    margin-bottom: 4rem;
    display: block;
    color: ${props => props.theme.colors.greyDark1};

    a {
        text-decoration: none;
        color: ${props => props.theme.colors.primary};
    }
`

export const ButtonsContainer = styled.div`
    margin-top: 4rem;
    width: 50%;
    display: flex;
    justify-content: space-between;
    float: right;

    @media only screen and (max-width: 112.5em) {
        width: 60%;
    } //1800px

    @media only screen and (max-width: 75em) {
        width: 70%;
    } //1200px

    @media only screen and (max-width: 37.5em) {
        width: 90%;
    } //600px

    div {
        margin-right: 2rem;
    }
`

export const SvgContainer = styled.div`
    text-align: center;

    svg {
        width: 8rem;
        height: 8rem;
        fill: ${props => props.theme.colors.primary};
    }
`
