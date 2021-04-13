import React from 'react'

import Alert from './style'

export enum Types {
    red = 'red',
    green = 'green'
}

export interface Props {
    type: Types
}

const name: React.FC<Props> = ({ type, ...props }) => {
    return <Alert type={type}>{props.children}</Alert>
}

export default name
