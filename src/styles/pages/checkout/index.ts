import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface PageContainerProps {
    imageUrl: string
}

export const PageContainer = styled(motion.div)<PageContainerProps>`
    min-height: calc(100vh - 6rem);
    position: relative;
    padding-top: 6rem;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            to right bottom,
            ${props => props.theme.colors.greyDark1},
            ${props => props.theme.colors.greyDark3}
        ); // url(${props => props.imageUrl});
        background-size: cover;
        background-position: center;
        /* filter: brightness(60%); */
    }
`

export const Box = styled(motion.div)`
    padding: 4rem;
    border-radius: 1.5rem;
    position: absolute;
    box-shadow: 1rem 1.5rem 4rem rgba(0, 0, 0, 0.2);

    @media only screen and (max-width: 112.5em) {
        padding: 2rem;
    } //1800px
`

export const EmptyCart = styled.p`
    font-size: 3rem;
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 300;
`

export const Container = styled(Box)`
    background-color: ${props => props.theme.colors.white};
    width: 35%;
    top: 5%;
    left: 10%;

    @media only screen and (max-width: 112.5em) {
        width: 40%;
        top: 5%;
        left: 15%;
    } //1800px

    @media only screen and (max-width: 75em) {
        width: 75%;
        top: 35rem;
        left: 16rem;
    } //1200px

    @media only screen and (max-width: 37.5em) {
        width: 90%;
        top: 40rem;
        left: 5%;
    } //600px
`

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h2 {
        font-size: 4rem;
        font-weight: 300;
        color: ${props => props.theme.colors.greyDark1};
    }

    svg {
        width: 3rem;
        height: 3rem;
        fill: ${props => props.theme.colors.greyDark1};
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.2);
        }
    }
`
