import styled from 'styled-components'
import { motion } from 'framer-motion'
import NextImage from 'next/image'

export const Container = styled(motion.div)`
    height: calc(100vh - 6rem);
    position: relative;
    z-index: 1;
`

export const ImageContainer = styled(motion.div)`
    width: 25vw;
    height: 80vh;
    position: absolute;
    border-radius: 3px;
    overflow: hidden;

    /* width: 42vw;
    height: 60vh; */

    @media only screen and (max-width: 112.5em) {
        width: 33vw;
    } //1800px

    @media only screen and (max-width: 75em) {
        width: 40vw;
        /* height: 48vh; */
    } //1200px

    @media only screen and (max-width: 56.25em) {
        width: 50vw;
        height: 60vh;
    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 70vw;
        height: 50vh;

        /* height: 35vh; */
    } //600px

    @media only screen and (max-width: 25em) {
        /* width: 80vw;*/
        height: 40vh;
    } //400px
`

export const Img = styled(NextImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const Title = styled.h1`
    font-size: 10rem;
    font-weight: 600;
    color: ${props => props.theme.colors.white};
    z-index: 100;
    width: 100%;
    letter-spacing: 0.4rem;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    margin-left: 2rem;
    width: 95%;

    span {
        position: absolute;
        top: 100%;
        right: 0%;

        @media only screen and (max-width: 56.25em) {
            top: 100%;
            right: 10%;
        } //900px

        @media only screen and (max-width: 37.5em) {
            position: static;
        } //600px
    }

    @media only screen and (max-width: 112.5em) {
        font-size: 8rem;
    } //1800px

    @media only screen and (max-width: 84.375em) {
        font-size: 7rem;
    } //1350px

    @media only screen and (max-width: 75em) {
        font-size: 5.5rem;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        font-size: 4rem;
        top: 10%;
        text-align: center;
    } //900px
`

export const Subtitle = styled.p`
    font-size: 2rem;
    font-weight: 300;
    color: ${props => props.theme.colors.white};
    z-index: 100;
    align-items: center;
    position: absolute;
    top: 6rem;
    left: 6rem;
    width: 40rem;
    padding: 8rem 2rem;

    @media only screen and (max-width: 75em) {
        font-size: 1.8rem;
        top: 2rem;
        left: 2rem;
    } //1200px

    @media only screen and (max-width: 56.25em) {
        top: -0.5rem;
        left: -1rem;
    } //900px

    @media only screen and (max-width: 37.5em) {
        padding: 0;
        top: 120%;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
    } //600px
`

export const ButtonContainer = styled.div`
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
`
