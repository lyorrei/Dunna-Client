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
