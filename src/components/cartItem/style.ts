import styled from 'styled-components'

export const Container = styled.div`
    padding: 0.5rem 1rem;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    svg {
        position: absolute;
        top: 0;
        right: 0.5rem;
        width: 1.5rem;
        height: 2rem;
        color: red;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.2);
        }
    }

    &:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    @media only screen and (max-width: 56.25em) {
        padding: 0.5rem 0rem;
    } //900px
`

export const ImageContainer = styled.div`
    width: 20%;
    cursor: pointer;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
`

export const Name = styled.p`
    font-size: 1.8rem;
    color: ${props => props.theme.colors.greyDark1};
    font-weight: 700;
    flex: 0 0 50%;

    cursor: pointer;
`

export const Price = styled.p`
    font-size: 1.5rem;
    color: ${props => props.theme.colors.greyDark3};
    font-family: sans-serif;
`
