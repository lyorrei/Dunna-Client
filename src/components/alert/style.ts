import styled, { css } from 'styled-components'
import { Props } from './index'

const Alert = styled.div<Props>`
    display: block;
    padding: 2rem 1.5rem;
    margin-bottom: 1rem;
    border-radius: 3px;
    font-size: 1.4rem;
    font-weight: 600;

    ${props =>
        props.type == 'red' &&
        css`
            color: #842029;
            background-color: #f8d7da;
            border-color: #f5c2c7;
        `}
`

export default Alert
