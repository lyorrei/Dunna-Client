import React, { useRef, useState, useEffect } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useField } from '@unform/core'
import 'react-datepicker/dist/react-datepicker.css'

import { Label } from './style'

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
    name: string
    label?: string
}

export default function DatePicker({ name, label, ...rest }: Props) {
    const datepickerRef = useRef(null)
    const { fieldName, registerField, defaultValue, error } = useField(name)
    const [date, setDate] = useState(defaultValue || null)

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: datepickerRef.current,
            path: 'props.selected',
            clearValue: (ref: any) => {
                ref.clear()
            }
        })
    }, [fieldName, registerField])
    return (
        <div>
            {label && <Label>{label}</Label>}
            <ReactDatePicker
                ref={datepickerRef}
                selected={date}
                onChange={setDate}
                startDate={startDate}
                dateFormat="dd/MM/yyyy"
                {...rest}
            />
        </div>
    )
}
