import styled from 'styled-components'

export const Container = styled.div`
    padding: 20rem 8rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
    grid-gap: 6rem;
    align-items: center;
    justify-items: center;

    @media only screen and (max-width: 112.5em) {
        padding: 12rem 8rem;
    } //1800px

    @media only screen and (max-width: 75em) {
        padding: 8rem;
    } //1200px

    @media only screen and (max-width: 37.5em) {
        padding: 6rem;
        grid-template-columns: 1fr;
    } //600px

    @media only screen and (max-width: 25em) {
        padding: 4rem 2rem;
    } //400px
`

export const TextContainer = styled.div`
    text-align: center;
    width: 80%;

    @media only screen and (max-width: 112.5em) {
        width: 90%;
    } //1800px

    h3 {
        font-size: 4.5rem;
        font-weight: 300;
        margin-bottom: 2rem;
        color: ${props => props.theme.colors.greyDark1};
    }

    p {
        color: ${props => props.theme.colors.greyDark2};
        font-size: 2rem;
    }
`

export const ImageContainer = styled.div`
    border-radius: 1rem;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        max-height: 60vh;
        object-position: center;
        object-fit: cover;
        /* transition: all 0.2s;

        &:hover {
            transform: scale(1.4);
        } */
    }
`
