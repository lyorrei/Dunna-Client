import { useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { Label, Error } from '../input/style'

import { customStyles, inputStyles } from './style'

interface Props extends SelectProps<OptionTypeBase> {
    name: string
    label?: string
    isMultiple?: boolean
    input?: boolean
    clearable? : boolean
}

const select: React.FC<Props> = ({
    name,
    isMultiple,
    input,
    label,
    clearable,
    ...rest
}) => {
    const selectRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                if (isMultiple) {
                    if (!ref.state.value) {
                        return []
                    }
                    return ref.state.value.map(
                        (option: OptionTypeBase) => option.value
                    )
                }
                if (!ref.state.value) {
                    return ''
                }
                return ref.state.value.value
            },
            setValue: (ref: any, value: any) => {
                ref.select.setValue(value)
            }
        })
    }, [fieldName, registerField, rest.isMulti])
    return (
        <div>
            {label && <Label htmlFor={fieldName}>{label}</Label>}
            <Select
                ref={selectRef}
                styles={!input ? customStyles : inputStyles}
                defaultValue={defaultValue }
                instanceId={'randomString'}
                isMulti={isMultiple}
                isClearable={clearable}
                {...rest}

                // value={
                //     rest.options &&
                //     rest.options.filter(option => option.value == defaultValue)
                // }
                //    onChange={() => {}}
            />
            {error && <Error>{error}</Error>}
        </div>
    )
}

export default select
