import styled, { css } from 'styled-components'

interface IsClickedProp {
    isClicked: boolean
}

export const Nav = styled.nav`
    width: 100%;
    background-color: ${props => props.theme.colors.white};
    height: 6rem;
    display: flex;
    z-index: 10;
    padding: 0 3rem;

    position: fixed;
    top: 0;
    left: 0;

    @media only screen and (max-width: 37.5em) {
        padding: 0;
    } //600px
`

export const LogoBox = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    height: 100%;

    img {
        height: 100%;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: translateY(-0.3rem);
        }
    }
`

export const NavBox = styled.ul<IsClickedProp>`
    margin: 0 2rem;

    flex: 1;
    display: flex;
    justify-content: flex-start;
    list-style: none;

    @media only screen and (max-width: 43.75em) {
        display: none;
        ${props =>
            props.isClicked &&
            css`
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                margin: 0;
                z-index: 10;
                background-image: linear-gradient(
                    to bottom right,
                    ${props => props.theme.colors.primaryDark},
                    ${props => props.theme.colors.primaryLight}
                );
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                height: 100vh;
                padding: 4rem;
            `}
    } //700px
`
interface LiProps {
    isActive: boolean
    isClicked: boolean
    marginRight?: boolean
}

export const Li = styled.li<LiProps>`
    position: relative;
    padding: 0 2rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    border-radius: ${props => props.theme.sizes.borderRadius};
    ${props => props.marginRight && `margin-right: auto;`}

    @media only screen and (max-width: 43.75em) {
        ${props =>
            props.isClicked &&
            css`
                padding: 2.2rem;
                margin-bottom: 0.5rem;
                text-align: center;
                justify-content: center;
                display: inline-block;
                margin-right: 0;
            `}
    } //700px

    ${props =>
        props.isActive &&
        `background-color: ${props.theme.colors.backgroundLight};`}

    &:hover {
        background-color: ${props => props.theme.colors.backgroundLight};
        color: ${props => props.theme.colors.greyDark1};
    }

    a,
    a:link,
    a:visited {
        font-size: 1.6rem;
        color: ${props => props.theme.colors.greyDark1};
        display: flex;
        align-items: center;
        font-weight: 400;
        text-decoration: none;
        height: 100%;
        font-weight: 600;

        svg {
            fill: ${props => props.theme.colors.greyDark1};
            margin-right: 1rem;
            width: 2rem;
            height: 2rem;

            ${props =>
                !props.isActive &&
                `color: ${props => props.theme.colors.white};`}
        }

        @media only screen and (max-width: 43.75em) {
            ${props =>
                props.isClicked &&
                css`
                    text-align: center;
                    font-size: 2.4rem;
                `}

            ${props =>
                !props.isActive &&
                `color: ${props => props.theme.colors.white};`}
            &:hover {
                color: ${props => props.theme.colors.greyDark1};
            }
        } //700px
    }

    svg {
        width: 2rem;
        height: 2rem;
        fill: ${props => props.theme.colors.greyDark1};
        cursor: pointer;
        transition: all 0.2s;
    }

    span {
        font-size: 1.2rem;
        font-weight: 700;
        height: 1.8rem;
        width: 1.8rem;
        border-radius: 50%;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        position: absolute;
        top: 0.8rem;
        right: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    button {
        border: 1px solid ${props => props.theme.colors.greyDark1};
        background: transparent;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: ${props => props.theme.colors.greyDark1};
        font-size: 1.6rem;
        padding: 1rem;
        border-radius: ${props => props.theme.sizes.borderRadius};

        @media only screen and (max-width: 43.75em) {
            ${props =>
                props.isClicked &&
                css`
                    text-align: center;
                    font-size: 2.4rem;
                `}
        }

        ${props =>
            !props.isActive && `color: ${props => props.theme.colors.white};`}

        svg {
            fill: ${props => props.theme.colors.greyDark1};
            margin-right: 1rem;
            width: 2rem;
            height: 2rem;

            ${props =>
                !props.isActive &&
                `fill: ${props => props.theme.colors.white};`}
        }
    }
`

export const ToogleBox = styled.div<IsClickedProp>`
    cursor: pointer;
    display: flex;
    align-items: center;
    display: none;

    @media only screen and (max-width: 43.75em) {
        display: block;
        position: absolute;
        height: 100%;

        top: 50%;
        right: 0;
        transform: translate(-50%, -50%);
        display: flex;
        background-color: #fff;
    } //600px

    span {
        width: 3rem;
        height: 2px;

        background-color: ${props => props.theme.colors.greyDark1};
        position: relative;
        display: block;

        transition: all 0.2s;

        ${props => props.isClicked && `background-color: transparent;`}

        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${props => props.theme.colors.greyDark1};
            display: block;
            transition: all 0.2s;
        }

        &::before {
            top: -1rem;

            ${props =>
                props.isClicked &&
                css`
                    top: 0;
                    transform: rotate(45deg);
                `}
        }

        &::after {
            top: 1rem;

            ${props =>
                props.isClicked &&
                css`
                    top: 0;
                    transform: rotate(-45deg);
                `}
        }

        &:hover {
            ${props =>
                !props.isClicked &&
                css`
                    &::before {
                        top: -1.2rem;
                    }

                    &::after {
                        top: 1.2rem;
                    }
                `}

            &:hover {
                ${props =>
                    props.isClicked &&
                    css`
                        transform: scale(1.2);
                    `}
            }
        }
    }
`
