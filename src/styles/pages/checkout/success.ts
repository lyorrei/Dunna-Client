import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PageContainer = styled(motion.div)`
    background-color: ${props => props.theme.colors.white};
    min-height: calc(100vh - 6rem);
`

export const Container = styled(motion.div)`
    width: 40%;
    padding: 4rem 0;
    margin: 0 auto;

    @media only screen and (max-width: 112.5em) {
        width: 60%;
    } //1800px

    @media only screen and (max-width: 56.25em) {
        width: 80%;
    } //900px
`

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 5rem;

    @media only screen and (max-width: 112.5em) {
        font-size: 3.4rem;
    } //1800px

    @media only screen and (max-width: 37.5em) {
        margin-bottom: 0;
    } //600px
`

export const SubTitle = styled.h3`
    font-size: 2rem;
    color: ${props => props.theme.colors.primaryDark};
    margin-bottom: 3rem;
    margin-top: 4rem;


`

export const Total = styled.p`
    font-size: 1.8rem;
    font-family: sans-serif;
    margin-top: 4rem;
    color: ${props => props.theme.colors.greyDark1};

    @media only screen and (max-width: 37.5em) {
        font-size: 1.5rem;
    } //600px

    span {
        margin-right: 2rem;
        font-size: 2rem;
        font-family: 'Raleway', sans-serif;
        color: ${props => props.theme.colors.primaryDark};
        font-weight: 700;

    }
`

export const ButtonContainer = styled.div`
    margin-top: 2rem;
    /* width: 30%; */
    /* float: right; */
    display: flex;
    justify-content: flex-end;

    button {
        width: 30%;

        @media only screen and (max-width: 75em) {
            width: 50%;
        } //1200px

        @media only screen and (max-width: 37.5em) {
            width: 70%;
        } //600px
    }
`
