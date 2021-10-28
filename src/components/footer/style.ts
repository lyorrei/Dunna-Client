import styled from 'styled-components'

export const Footer = styled.footer`
    background-color: ${props => props.theme.colors.greyDark1};
    padding: 4rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem;
    justify-items: center;

    @media only screen and (max-width: 37.5em) {
        grid-template-columns: 1fr;
    } //600px

    /* @media only screen and (max-width: 75em) {
        grid-gap: 4rem;
    } //1200px */
`

export const LogoBox = styled.div`
    grid-column: 1 / -1;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            fill: ${props => props.theme.colors.white};
            width: 16rem;
            /* height: 8rem; */
            transition: all 0.2s;

            &:hover {
                transform: scale(1.1);
            }
        }
        p {
            color: ${props => props.theme.colors.white};
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            margin-bottom: 1rem;
        }
        span {
            color: ${props => props.theme.colors.primary};
            transition: all 0.2s;
            font-size: 1.6rem;
            text-transform: uppercase;
            letter-spacing: 0.2rem;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
`

export const FooterNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 50%;
    border-top: 1px solid ${props => props.theme.colors.greyDark3};
    padding: 1rem 0;

    @media only screen and (max-width: 75em) {
        width: 80%;
    } //1200px

    a {
        text-decoration: none;
        color: ${props => props.theme.colors.white};
        text-transform: uppercase;
        font-size: 1.6rem;
        transition: all 0.2s;

        &:hover {
            transform: rotate(10deg) scale(1.1);
            color: ${props => props.theme.colors.primary};
        }
    }
`

export const SocialNavigation = styled.div`
    border-top: 1px solid ${props => props.theme.colors.greyDark3};
    padding: 1rem 0;
    width: 50%;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 75em) {
        width: 80%;
    } //1200px
    a {
        text-decoration: none;
        color: ${props => props.theme.colors.white};
        text-transform: uppercase;
        font-size: 1.6rem;
        transition: all 0.2s;
        display: flex;
        align-items: center;

        &:hover {
            transform: rotate(10deg) scale(1.1);
        }

        svg {
            width: 2.5rem;
            height: 2.5rem;
            fill: ${props => props.theme.colors.white};
            cursor: pointer;
            margin-right: 1rem;
        }
    }
`
