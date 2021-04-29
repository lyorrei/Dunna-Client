import styled, { css } from 'styled-components'

export const Stage = styled.div`
    position: absolute;
    top: 10rem;
    left: 2%;

    display: grid;
    grid-gap: 2rem;

    @media only screen and (max-width: 37.5em) {
        display: none;
        visibility: hidden;
    } //600px
`

interface StageItemProps {
    isActive: boolean
}

export const StageItem = styled.div<StageItemProps>`
    display: grid;
    justify-items: center;
    grid-gap: 1rem;
    padding: 2rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s;

    @media only screen and (max-width: 56.25em) {
        padding: 1.5rem .5rem;
    } //900px

    ${props =>
        props.isActive && `background-color: ${props.theme.colors.white};`}

    svg {
        width: 3rem;
        height: 3rem;
        fill: ${props => props.theme.colors.white};
        transition: all 0.2s;

        ${props =>
            props.isActive &&
            css`
                fill: ${props.theme.colors.greyDark1};
            `}
    }

    p {
        color: ${props => props.theme.colors.white};
        font-size: 1.4rem;
        transition: all 0.2s;

        ${props =>
            props.isActive &&
            css`
                color: ${props.theme.colors.greyDark1};
            `}
    }
`
