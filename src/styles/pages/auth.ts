import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface ContainerProps {
    background: string
}

export const Container = styled(motion.div)<ContainerProps>`
    position: relative;
    height: calc(100vh - 6rem);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${props => props.background});
        background-size: cover;
        filter: brightness(60%);
    }
`

export const Content = styled(motion.div)`
    width: 30vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);

    background-color: ${props => props.theme.colors.white};

    border-radius: ${props => props.theme.sizes.borderRadius};
    padding: 6rem 4rem;
    padding-bottom: 6rem;
    overflow: hidden;

    @media only screen and (max-width: 112.5em) {
        width: 40vw;
    } //1800px

    @media only screen and (max-width: 75em) {
        width: 50vw;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        width: 65vw;
    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 85vw;
    } //600px

    @media only screen and (max-width: 25em) {
        width: 90vw;
        padding: 4rem 2rem;
    } //400px
`

interface ButttonContainerProps {
    loading: number
}

export const ButttonContainer = styled.div<ButttonContainerProps>`
    display: flex;
    margin-bottom: 3rem;

    ${props =>
        props.loading &&
        css`
            display: none;
        `}
`

interface ButtonProps {
    login: boolean
}

const Button = styled.button<ButtonProps>`
    border: none;
    font-size: 1.8rem;
    border-radius: 10rem;
    padding: 0.8rem 2rem;
    cursor: pointer;
    outline: none;
    transition: all 1s;
    z-index: 0;

    color: ${props => props.theme.colors.greyDark1};
    background-color: rgba(0, 194, 168, 0.2);
`

const activeButton = css`
    color: ${props => props.theme.colors.white};
    background-color: #00c2a8;
    z-index: 1;
`

export const ButtonLogin = styled(Button)`
    ${props => props.login && activeButton}
`

export const ButtonSignup = styled(Button)`
    margin-left: -1rem;

    ${props => !props.login && activeButton}
`

interface AuthContainerProps {
    login: boolean
    loading: number
}

const activeContainer = css`
    transform: translateX(-120%);
`

export const AuthContainer = styled.div<AuthContainerProps>`
    display: grid;
    grid-template-columns: repeat(2, 100%);
    grid-gap: 20%;
    transition: all 0.8s;

    ${props => !props.login && activeContainer}
    ${props => props.loading && `display: none`}
`
