import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    top: 110%;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    min-width: 16rem;
    background-color: ${props => props.theme.colors.white};
    overflow: auto;
    padding: 0.5rem 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    box-shadow: 1rem 1.25rem 2rem rgba(0, 0, 0, 0.2);

    @media only screen and (max-width: 50em) {
        position: relative;
        top: 0;
        left: 0;
        flex-direction: column;
        width: 100%;
        min-width: auto;
        background-color: transparent;
        box-shadow: none;
        margin-top: 1rem;
        border: 0;
    } //700px

    a,
    button {
        border: none;
        outline: none;
        cursor: pointer;
        color: ${props => props.theme.colors.greyDark1};
        padding: 1rem 1.5rem;
        font-size: 1.6rem !important;
        display: flex;
        align-items: center;
        background-color: transparent;
        text-decoration: none;
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        transition: all 0.2s;
        width: 100%;

        @media only screen and (max-width: 50em) {
            font-size: 2rem !important;
            padding: 2rem 2.5rem;
        } //700px

        svg {
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }

        &:hover {
            background-color: ${props => props.theme.colors.greyLight4};
        }
    }
`

export const NavDropdownContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    display: flex;
    min-width: 16rem;
    background-color: ${props => props.theme.colors.white};
    overflow: auto;
    /* padding: 0.5rem; */
    /* border: 1px solid rgba(0, 0, 0, 0.2);*/
    border-radius: 3px;
    box-shadow: 1rem 1.25rem 2rem rgba(0, 0, 0, 0.2);

    @media only screen and (max-width: 50em) {
        position: relative;
        top: 0;
        left: 0;
        flex-direction: column;
        width: 100%;
        min-width: auto;
        background-color: transparent;
        box-shadow: none;
        margin-top: 1rem;
    } //700px

    a,
    button {
        border: none;
        outline: none;
        cursor: pointer;
        color: ${props => props.theme.colors.greyDark1};
        padding: 2rem 2.5rem;
        font-size: 1.6rem !important;
        display: flex;
        align-items: center;
        background-color: transparent;
        text-decoration: none;
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        transition: all 0.2s;

        @media only screen and (max-width: 50em) {
            font-size: 2rem !important;
        } //700px

        &:hover {
            background-color: ${props => props.theme.colors.backgroundLight};
        }

        &:not(:last-child) {
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 3px;

            @media only screen and (max-width: 50em) {
                border-right: none;
                border-radius: 0;
            } //700px
        }
    }
`
