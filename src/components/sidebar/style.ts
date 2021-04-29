import styled, { css } from 'styled-components'

export const Container = styled.div`
    background-color: ${props => props.theme.colors.greyDark1};
    transition: all 2s;
    min-height: calc(100vh - 6rem);
    /* height: 100vh; */
    /* width: 18vw; */
    flex: 0 0 18vw;
    transition: all 0.8s ease-out;
    /* position: fixed;
    top: 6rem;
    left: 0; */
    z-index: 10;

    div {
        text-transform: uppercase;
        border-bottom: 1px solid ${props => props.theme.colors.greyLight1};
        padding: 2.4rem 2.5rem;
        padding-bottom: 1rem;
        color: ${props => props.theme.colors.greyLight1};
        font-size: 2rem;
        font-weight: 700;
        transition: all 0.2s;

        &:hover {
            transform: translateY(-0.2rem);
        }

        &:not(:first-child) {
            margin-top: 1.6rem;
        }
    }

    ul {
    }
`

interface LiProps {
    isActive: boolean
}

export const Li = styled.li<LiProps>`
    position: relative;

    a:link,
    a:visited {
        display: flex;
        align-items: center;

        position: relative;
        padding: 1.8rem 5.5rem;
        z-index: 10;

        text-transform: uppercase;
        text-decoration: none;
        color: ${props => props.theme.colors.greyLight1};
        font-size: 1.6rem;
        font-weight: 600;

        transition: all 0.8s;

        ${props =>
            props.isActive &&
            css`
                background-image: linear-gradient(
                    to right,
                    ${props.theme.colors.greyLight1},
                    ${props.theme.colors.greyLight4}
                );
                color: ${props.theme.colors.greyDark1};
            `}
    }

    svg {
        fill: ${props => props.theme.colors.greyLight1};
        width: 2rem;
        height: 2rem;
        margin-right: 1.5rem;

        transition: all 0.8s;

        ${props =>
            props.isActive &&
            css`
                fill: ${props => props.theme.colors.greyDark1};
            `}
    }

    &:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 3px;
        background-image: linear-gradient(
            to right,
            ${props => props.theme.colors.greyLight1},
            ${props => props.theme.colors.greyLight4}
        );
        transform: scaleY(0);
        transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
            background-color 0.1s;
    }

    &:hover::before {
        transform: scaleY(1);
        width: 100%;
    }

    &:hover {
        a:link,
        a:visited {
            color: ${props => props.theme.colors.greyDark1};
        }
        svg {
            fill: ${props => props.theme.colors.greyDark1};
        }
    }

    /* .sideLink.active:link,
        .sideLink.active:visited {
            background-image: linear-gradient(to right, var(--color-grey-light-1), var(--color-grey-light-4));
            color: var(--color-grey-dark-1);

            .sideIcon {
                fill: var(--color-grey-dark-1);
            }
        } */
`
