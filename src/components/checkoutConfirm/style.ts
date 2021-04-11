import styled from 'styled-components'

export const Title = styled.h3`
    font-size: 4rem;
    font-weight: 300;
    color: ${props => props.theme.colors.greyDark1};
    margin-bottom: 2rem;

    @media only screen and (max-width: 37.5em) {
        font-size: 3rem;
    } //600px
`

export const Text = styled.p`
    font-size: 1.6rem;
    color: ${props => props.theme.colors.greyDark1};

    @media only screen and (max-width: 37.5em) {
        font-size: 1.5rem;
    } //600px
`

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
