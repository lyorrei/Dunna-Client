import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.primary};
    /* min-height: calc(100vh - 6rem); */
`
export const WhiteContainer = styled.div`
    padding: 16rem 0;
    padding-top: 12rem;

    -webkit-clip-path: polygon(0 15%, 100% 0, 100% 75%, 0 100%);
    clip-path: polygon(0 15%, 100% 0, 100% 75%, 0 100%);

    background-image: linear-gradient(
        ${props => props.theme.colors.white},
        ${props => props.theme.colors.white}
    );
    background-size: cover;
    background-position: top;
    position: relative;

    @media only screen and (max-width: 37.5em) {
        -webkit-clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
        clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
    } //600px
`

export const Title = styled.h2`
    /* color: ${props => props.theme.colors.greyDark1};
    text-align: center;
    font-size: 4rem;
    font-weight: 400;
    margin-bottom: 6rem;
    letter-spacing: 0.4rem; */

    font-size: 3.8rem;
    text-transform: uppercase;
    font-weight: 700;
    background-image: linear-gradient(
        to right,
        ${props => props.theme.colors.primaryLight},
        ${props => props.theme.colors.primaryDark}
    );
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0.2rem;
    transition: all 0.2s;
    text-align: center;
    margin-bottom: 3.2rem;
    transition: all 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    grid-gap: 6rem;
    align-items: center;
    width: 70%;
    margin: 0 auto;

    @media only screen and (max-width: 75em) {
        width: 90%;
    } //1200px
`

export const TextContainer = styled.div`
    h3 {
        font-size: 1.8rem;
        font-weight: 700;
        color: ${props => props.theme.colors.greyDark2};
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
    p {
        font-size: 1.6rem;
        &:not(:last-child) {
            margin-bottom: 3rem;
        }
    }
`

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 30vh;

    /* @media only screen and (max-width: 37.5em) {
        display: none;
        visibility: hidden;
    } //600px */
`

const Img = styled.img`
    position: absolute;
    width: 55%;
    height: 25rem;
    object-fit: cover;
    transform: translateY(-50%);
    outline-offset: 2rem;
    transition: all 0.2s;
    border-radius: 3px;
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 40%);

    @media only screen and (max-width: 100em) {
        height: 20rem;
    } //1600px

    &:hover {
        outline: 1.5rem solid ${props => props.theme.colors.primary};
        transform: scale(1.05) translateY(calc(-50% - 0.5rem));
        box-shadow: 0 2.5rem 4rem rgb(0 0 0 / 50%);
        z-index: 20;
    }
`

export const Img1 = styled(Img)`
    left: 0;
    top: 30%;
`

export const Img2 = styled(Img)`
    right: 0;
    top: 40%;
`

export const Img3 = styled(Img)`
    left: 20%;
    top: 60%;
`
