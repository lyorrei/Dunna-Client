import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

interface ContainerProps {
    showCart: boolean
}

export const Container = styled(motion.div)<ContainerProps>`
    position: fixed;
    top: 10rem;
    background-color: ${props => props.theme.colors.white};
    padding: 4rem 1.8rem;
    z-index: 100;
    border-radius: 2rem;
    box-shadow: 1.5rem 2rem 4rem rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(100px);
    transition: all 0.4s;

    width: 25vw;
    right: 2vw;
    ${props =>
        !props.showCart &&
        css`
            right: -25vw;
        `}

    @media only screen and (max-width: 112.5em) {
        width: 35vw;

        ${props =>
            !props.showCart &&
            css`
                right: -35vw;
            `}
    } //1800px

    @media only screen and (max-width: 75em) {
        width: 45vw;

        ${props =>
            !props.showCart &&
            css`
                right: -45vw;
            `}
    } //1200px

    @media only screen and (max-width: 56.25em) {
        width: 60vw;

        ${props =>
            !props.showCart &&
            css`
                right: -60vw;
            `}
    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 80vw;

        ${props =>
            !props.showCart &&
            css`
                right: -80vw;
            `}
    } //600px

    @media only screen and (max-width: 25em) {
        width: 85vw;

        ${props =>
            !props.showCart &&
            css`
                right: -85vw;
            `}
    } //400px

    /* transition: all .5s .2s; */
    /* ${props => (props.showCart ? `right: 2vw;` : `right: -25vw;`)}; */
`

export const CartBox = styled.div`
    position: absolute;
    top: 1rem;
    left: 0;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    transform: translateX(-120%);
    background-color: ${props => props.theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    /* box-shadow: 1rem 1.5rem 1rem rgba(0, 0, 0, 0.2); */
    border: 3px solid ${props => props.theme.colors.primary};

    &:hover {
        transform: translateX(-120%) scale(1.2);
    }

    span {
        position: absolute;
        top: -0.5rem;
        right: 0;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        color: ${props => props.theme.colors.white};
        background-color: ${props => props.theme.colors.primary};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-family: sans-serif;
    }

    svg {
        width: 2rem;
        height: 2rem;
        fill: ${props => props.theme.colors.greyDark1};

    }
`

export const Title = styled(motion.h2)`
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 700;
    font-size: 3.4rem;
    margin-bottom: 8rem;

    @media only screen and (max-width: 75em) {
        margin-bottom: 4rem;
    } //1200px
`

export const Message = styled.p`
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    text-align: center;
`

export const CartItemsContainer = styled.div`
    height: 38vh;
    overflow-y: auto;
    padding-right: 2rem;

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

export const Total = styled.p`
    margin-top: 6rem;
    margin-bottom: 6rem;
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    color: ${props => props.theme.colors.greyDark2};

    span {
        font-family: sans-serif;
    }

    @media only screen and (max-width: 37.5em) {
        margin-top: 4rem;
        margin-bottom: 4rem;
    } //600px
`
