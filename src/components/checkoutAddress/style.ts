import styled, { css } from 'styled-components'

const Scroll = css`
    padding-right: 3rem;

    /* width */
    ::-webkit-scrollbar {
        width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.5rem grey;
        border-radius: 1rem;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.primary};
        border-radius: 1rem;
    }
`

export const AddressesContainer = styled.div`
    max-height: 18rem;
    overflow-y: auto;

    ${Scroll};
`

export const AddressContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5rem;
    border-radius: 3px;

    &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.colors.greyLight4};
    }
`

export const AddressItem = styled.div`
    margin-right: 6rem;
    width: 30%;

    @media only screen and (max-width: 56.25em) {
        margin-right: 4rem;
        width: 40%;
    } //900px

    @media only screen and (max-width: 37.5em) {
        margin-right: 1.5rem;
    } //600px

    p {
        font-size: 1.4rem;
        padding: 0.2rem 0;
        font-family: sans-serif;

        @media only screen and (max-width: 56.25em) {
            font-size: 1.2rem;
        } //900px

        
    }
`

interface CheckProps {
    isChecked: boolean
}

export const Check = styled.span<CheckProps>`
    display: inline-block;
    border: 0.4rem solid ${props => props.theme.colors.primary};
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-left: 1rem;
    position: relative;
    cursor: pointer;
    transition: all 0.2s;

    margin-right: 4rem;

    @media only screen and (max-width: 112.5em) {
        margin-right: 2rem;
    } //1800px

    @media only screen and (max-width: 56.25em) {
        margin-left: 0;
        width: 2.2rem;
        height: 2.2rem;
    } //900px

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 1.3rem;
        height: 1.3rem;
        transition: all 0.2s;

        ${props =>
            props.isChecked &&
            `background-color: ${props.theme.colors.primary};`}

        @media only screen and (max-width: 56.25em) {
            margin-left: 0;
            width: 0.8rem;
            height: 0.8rem;
        } //900px
    }

    &:hover {
        transform: scale(1.05);
    }
`

export const NoAddresses = styled.p`
    font-size: 2rem;
    margin: 2rem auto;
    display: inline-block;
`

export const ButtonsContainer = styled.div`
    margin-top: 4rem;
    width: 40%;
    float: right;
`
