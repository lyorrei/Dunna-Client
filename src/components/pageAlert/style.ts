import styled from 'styled-components'

export const PageAlert = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${props => props.theme.colors.greyDark1};
    z-index: 1000;

    padding: 1.5rem;

    text-align: center;
    text-transform: uppercase;
    font-size: 1.8rem;
    color: ${props => props.theme.colors.white};

    display: flex;
    align-items: center;
    justify-content: center;

    div {
        width: 85%;
    }

    svg {
        margin-left: 2rem;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        transition: all .2s;

        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-50%, -50%);

        &:hover {
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
`
