import styled from 'styled-components'

const ButtonContainer = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: flex-end;

    div {
        width: 30%;
        @media only screen and (max-width: 112.5em) {
            width: 60%;
        } //1800px

        @media only screen and (max-width: 75em) {
            width: 70%;
        } //1200px

        @media only screen and (max-width: 37.5em) {
            width: 90%;
        } //600px
    }
`

export default ButtonContainer
