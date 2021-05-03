import styled from 'styled-components'

interface ContainerProps {
    imageUrl: string
}

export const Container = styled.div<ContainerProps>`
    height: calc(100vh - 6rem);

    background-image:
     linear-gradient(
            to right bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6)
        ),
        url(${props => props.imageUrl}); // linear-gradient(to right bottom, white, black), ;
    background-repeat: no-repeat;
    background-size: cover;
    /* background-position: 70% 20%; */
    position: relative;
    background-position: 0 20%;

    @media only screen and (max-width: 56.25em) {
        background-position: 40% 20%;
    } //900px

    @media only screen and (max-width: 37.5em) {
        background-position: 0 20%;

        background-image: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.1),
                rgba(0, 0, 0, 0.9)
            ),
            url(${props => props.imageUrl}); // linear-gradient(to right bottom, white, black), ;
    } //600px
`

export const TextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);

    color: ${props => props.theme.colors.white};

    @media only screen and (max-width: 56.25em) {
        top: 35%;
        left: 70%;
    } //900px

    @media only screen and (max-width: 37.5em) {
        width: 49%;
        left: 50%;
        top: 80%;
        width: 80%;
    } //600px

    @media only screen and (max-width: 25em) {
        width: 90%;
    } //400px

    h2 {
        margin-bottom: 2rem;
        font-size: 5rem;
        font-weight: 300;

        @media only screen and (max-width: 37.5em) {
            font-size: 4rem;
        } //600px
    }

    p {
        font-size: 2.4rem;
        margin-bottom: 2.4rem;

        @media only screen and (max-width: 37.5em) {
            font-size: 2rem;
        } //600px
    }

    div {
        width: 40%;

        @media only screen and (max-width: 37.5em) {
            width: 100%;
        } //600px
    }
`
