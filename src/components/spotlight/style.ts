import styled from 'styled-components'

export const Container = styled.div`
    padding: 6rem 16rem;

    @media only screen and (max-width: 56.25em) {
        padding: 6rem 12rem;
    } //900px

    @media only screen and (max-width: 37.5em) {
        padding: 6rem;
    } //600px

    @media only screen and (max-width: 25em) {
        padding: 6rem 4rem;
    } //400px
`
