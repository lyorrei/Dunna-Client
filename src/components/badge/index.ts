import styled from 'styled-components'

interface BadgeProps {
    sold: boolean
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
        props.sold
            ? `background-color: #198754!important;`
            : `background-color: #0d6efd!important;`}
`
