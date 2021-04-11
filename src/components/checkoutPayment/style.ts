import styled from 'styled-components'

export const ButtonsContainer = styled.div`
    margin-top: 4rem;
    width: 50%;
    display: flex;
    justify-content: space-between;
    float: right;

    @media only screen and (max-width: 112.5em) {
        width: 60%;
    } //1800px

    @media only screen and (max-width: 75em) {
        width: 70%;
    } //1200px

    @media only screen and (max-width: 37.5em) {
        width: 90%;
    } //600px

    div {
        margin-right: 2rem;
    }
`
