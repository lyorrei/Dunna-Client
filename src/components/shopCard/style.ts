import styled, { css, keyframes } from 'styled-components'

const moveInTopWithTranslate = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-3rem) translate(-50%, -50%);
    }
    100% {
        opacity: 1;
        transform: translateY(0) translate(-50%, -50%);
    }
`

export const Card = styled.div`
    position: relative;
    height: 50rem;
    box-shadow: 1rem 1rem 4rem rgb(0 0 0 / 40%);

    figure {
        height: 100%;
        position: relative;
        overflow: hidden;
        z-index: 2;

        &:hover img {
            transform: scale(1);
            filter: blur(0.2rem) brightness(60%);
        }

        &:hover div {
            animation: ${moveInTopWithTranslate} 0.5s ease-out;
            opacity: 1;
        }

        &:hover figcaption {
            opacity: 1;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s;
            transform: scale(1.4);
            object-position: center;
        }

        div {
            position: absolute;
            top: 14%;
            left: 50%;
            z-index: 2;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.2s;
            width: 100%;
            text-align: center;
            transition: all 0.2s;

            @media only screen and (max-width: 56.25em) {
                display: none;
            } //900px

            &:hover {
                transform: translate(-50%, -50%) scale(1.1);
            }

            a {
                background-color: ${props => props.theme.colors.primary};
                border-radius: 3px;
                padding: 2rem 2.4rem;
                font-size: 1.6rem;
                text-decoration: none;
                color: ${props => props.theme.colors.white};
                text-transform: uppercase;
            }
        }

        figcaption {
            font-size: 2.2rem;
            color: ${props => props.theme.colors.white};
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.5s;

            @media only screen and (max-width: 56.25em) {
                display: none;
            } //900px
        }
    }

    h4 {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 300;
        z-index: 2;
        padding: 1.5rem 2rem;

        /* color: ${props => props.theme.colors.greyDark1}; */
        color: ${props => props.theme.colors.white};

        /* background-color: ${props => props.theme.colors.white}; */
        background-color: ${props => props.theme.colors.primary};
    }
`
