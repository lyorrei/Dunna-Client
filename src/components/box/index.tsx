import Link from 'next/link'
import React from 'react'

import { Item } from './style'

interface Props {
    link: string
    Icon: any
    title: string
    subTitle: string
}

const box: React.FC<Props> = ({ link, Icon, title, subTitle }) => {
    return (
        <Link href={link}>
            <Item>
                <Icon />
                <div>
                    <h4>{title}</h4>
                    <p>{subTitle}</p>
                </div>
            </Item>
        </Link>
    )
}

export default box
