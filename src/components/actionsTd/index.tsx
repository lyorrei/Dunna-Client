import React from 'react'
import Link from 'next/link'

import { ActionsTd } from './style'
import { IconType } from 'react-icons/lib'
import { FaTrash } from 'react-icons/fa'

interface Action {
    link?: string
    handler?(): void
    icon: IconType
    color: string
}

interface Props {
    actions: Action[]
}

const actionsTd: React.FC<Props> = ({ actions }) => {
    const actionsIcons = actions.map(action => {
        if (action.link !== undefined) {
            return (
                <Link href={action.link}>
                    <a>
                        <action.icon fill={action.color} />
                    </a>
                </Link>
            )
        }
        if (action.handler !== undefined) {
            return <action.icon fill={action.color} onClick={action.handler} />
        }
    })

    return <ActionsTd>{actionsIcons}</ActionsTd>
}

export default actionsTd
