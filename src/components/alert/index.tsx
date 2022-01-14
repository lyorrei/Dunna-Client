import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import Alert from './style'

export enum Types {
    red = 'red',
    green = 'green'
}

export interface Props {
    type: Types
    close?: () => void
}

const name: React.FC<Props> = ({ type, close, ...props }) => {
    return (
        <Alert close={close ? true : false} type={type}>
            <p>{props.children}</p>
            {close && (
                <span onClick={close}>
                    <AiOutlineClose />
                </span>
            )}
        </Alert>
    )
}

export default name
