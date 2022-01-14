import styled, { css } from 'styled-components'

import { Types } from './index'

export interface AlertInterface {
    type: Types
    close: boolean
}

const Alert = styled.div<AlertInterface>`
    position: relative;

    p {
        display: block;
        padding: 2rem 1.5rem;
        margin-bottom: 1rem;
        border-radius: 3px;
        font-size: 1.4rem;
        font-weight: 600;
        width: 90%;
    }

    span {
        position: absolute;
        top: 50%;
        right: 3%;
        transform: translate(-50%, -50%);
        cursor: pointer;

        svg {
            transition: all 0.2s;
            width: 1.8rem;
            height: 1.8rem;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    ${props =>
        props.type == 'red' &&
        css`
            color: #842029;
            background-color: #f8d7da;
            border-color: #f5c2c7;
        `}

    ${props =>
        props.type == 'green' &&
        css`
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
        `}
`

export default Alert
