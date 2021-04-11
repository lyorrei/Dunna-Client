import React from 'react'
import { Input } from '../input/style'
import { GlobalFilter } from './style'

interface Props {
    filter: string
    setFilter(string: string): void
}

const globalFilter: React.FC<Props> = ({ filter, setFilter }) => {
    return (
        <GlobalFilter>
            <span>Filtrar:</span>
            <Input onChange={e => setFilter(e.target.value)} />
        </GlobalFilter>
    )
}

export default globalFilter
