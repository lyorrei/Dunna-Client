import styled from 'styled-components'

interface ContainerProps {
    imageUrl: string
}

export const Container = styled.div<ContainerProps>`
    height: calc(100vh - 6rem);

    background-image: //linear-gradient(to right bottom, rgba(0,194,168, .4), rgb(255,255,255, .4)),
        url(${props => props.imageUrl}); // linear-gradient(to right bottom, white, black), ;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 70% 20%;
    position: relative;
`

export const TextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);

    color: ${props => props.theme.colors.white};

    @media only screen and (max-width: 37.5em) {
        width: 49%;
        left: 50%;
        top: 40%;
    } //600px

    @media only screen and (max-width: 25em) {
        width: 80%;
    } //400px

    h2 {
        margin-bottom: 2rem;
        font-size: 5rem;
        font-weight: 300;
    }

    p {
        font-size: 2.4rem;
        margin-bottom: 2.4rem;
    }

    div {
        width: 40%;

        @media only screen and (max-width: 25em) {
            width: 100%;
        } //400px
    }
`
