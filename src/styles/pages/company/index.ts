import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    min-height: calc(100vh - 6rem);
    background-color: ${props => props.theme.colors.white};
`

export const Company = styled.div`
    padding: 12rem 0;
    background-image: linear-gradient(
        105deg,
        ${props => props.theme.colors.primary} 0%,
        ${props => props.theme.colors.primary} 50%,
        rgb(255, 255, 255) 50%
    );

    @media only screen and (max-width: 75em) {
        background-image: linear-gradient(
            105deg,
            ${props => props.theme.colors.primary} 0%,
            ${props => props.theme.colors.primary} 66%,
            rgb(255, 255, 255) 66%
        );
    } //1200px

    @media only screen and (max-width: 56.25em) {
        background-image: linear-gradient(
            105deg,
            ${props => props.theme.colors.primary} 0%,
            ${props => props.theme.colors.primary} 74%,
            rgb(255, 255, 255) 74%
        );
    } //900px

    @media only screen and (max-width: 37.5em) {
        background-image: none;
        background-color: ${props => props.theme.colors.primary};
    } //600px
`

export const Container = styled.div`
    margin: 0 auto;
    max-width: 80vw;
    background-image: linear-gradient(
            105deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 50%
        ),
        url(../img/about-test.jpg);
    background-position: center;
    background-size: cover;
    box-shadow: 1rem 1rem 2.5rem rgba(0, 0, 0, 0.6);

    @media only screen and (max-width: 75em) {
        background-image: linear-gradient(
                105deg,
                rgba(255, 255, 255, 0.8) 0%,
                rgba(255, 255, 255, 0.8) 70%,
                transparent 70%
            ),
            url(../img/about-test.jpg);
    } //1200px

    @media only screen and (max-width: 56.25em) {
        background-image: linear-gradient(
                105deg,
                rgba(255, 255, 255, 0.8) 0%,
                rgba(255, 255, 255, 0.8) 80%,
                transparent 80%
            ),
            url(../img/about-test.jpg);
    } //900px

    @media only screen and (max-width: 37.5em) {
        background-image: none;
        background-image: linear-gradient(
                105deg,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.8)
            ),
            url(../img/about-test.jpg);
    } //600px

    @media only screen and (max-width: 25em) {
        max-width: 90vw;
    } //400px
`

export const Content = styled.div`
    width: 50%;
    padding: 8rem;
    padding-left: 5rem;

    @media only screen and (max-width: 75em) {
        width: 70%;
        padding: 4rem;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        width: 80%;
    } //900px

    @media only screen and (max-width: 37.5em) {
        text-align: center;
        width: 100%;
        padding-top: 4rem;
    } //600px
`

export const TitleContainer = styled.div`
    margin-bottom: 5rem;

    h2 {
        font-size: 5rem;
        color: ${props => props.theme.colors.primary};
        font-weight: 300;
        transition: all 0.2s;
    }
`

export const TextContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 6rem;
    p {
        color: var(--color-grey-dark-1);
        font-size: 1.8rem;
        line-height: 1.7;
        -webkit-column-count: 2;
        column-count: 2;
        -webkit-column-gap: 2rem;
        column-gap: 2rem;

        @media only screen and (max-width: 37.5em) {
            -webkit-column-count: 1;
            column-count: 1;
            -webkit-column-gap: none;
            column-gap: none;
        } //600px
    }
`
