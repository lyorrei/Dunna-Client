import styled, { css } from 'styled-components'

interface BadgeProps {
    type: string
    sold?: boolean
    visible?: boolean
}

export const Badge = styled.span<BadgeProps>`
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: 0.75em;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;

    ${props =>
        props.type === 'sold' &&
        css`
            ${props.sold === true
                ? `background-color: #198754!important;`
                : `background-color: #0d6efd!important;`}
        `}

    ${props =>
        props.type === 'visible' &&
        css`
            ${props.visible === true
                ? `background-color: #17a2b8!important;`
                : `background-color: #6c757d!important;`}
        `}
`
