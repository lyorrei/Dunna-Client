import React from 'react'

import { Item } from './style'
import { EditButton } from '../button'

interface Props {
    label: string
    fieldValue: string
    fieldName: string
    modalTitle: string
    inputType: string
    submitHandler(label: string, field: string, modalTitle: string, defaultValue: string, inputType: string): void
}

const userForm: React.FC<Props> = ({
    label,
    fieldValue,
    fieldName,
    modalTitle,
    inputType,
    submitHandler
}) => {
    return (
        <Item>
            <div>
                <label>{label}</label>
                <p>{fieldValue}</p>
            </div>
            <EditButton
                onClick={() => submitHandler(label, fieldName, modalTitle, fieldValue, inputType)}
            >
                Editar
            </EditButton>
        </Item>
    )
}

export default userForm
