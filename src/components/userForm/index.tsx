import React from 'react'

import { Item } from './style'
import { EditButton } from '../button'

interface Item {
    label: string
    fieldValue: any
    handler: () => void

}

interface Props {
    item: Item
}

const userForm: React.FC<Props> = ({ item }) => {
    return (
        <Item>
            <div>
                <label>{item.label}</label>
                <p>{item.fieldValue}</p>
            </div>
            <EditButton onClick={item.handler}>Editar</EditButton>
        </Item>
    )
}

export default userForm
