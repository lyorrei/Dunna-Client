import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { Input as InputStyle, Label, Error } from './style'

interface Props {
    name: string
    label?: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {

    const inputRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            path: 'value',
            ref: inputRef.current
        })
    }, [fieldName, registerField])

    return (
        <div>
            {label && <Label htmlFor={fieldName}>{label}</Label>}
            <InputStyle
                id={fieldName}
                ref={inputRef as any}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <Error>{error}</Error>}
        </div>
    )
}
export default Input
