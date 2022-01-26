import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { Li } from '../navbar/style'
import { IconType } from 'react-icons/lib'

interface Props {
    clicked: boolean
    link: string
    text: string
    aStyle?: React.CSSProperties
    marginRight?: boolean
    Icon?: IconType
}

const navLink: React.FC<Props> = ({
    clicked,
    link,
    text,
    aStyle,
    marginRight,
    Icon
}) => {
    const Router = useRouter()

    return (
        <Li
            isClicked={clicked}
            isActive={Router.asPath === link}
            marginRight={marginRight}
        >
            <Link href={link}>
                <a style={aStyle}>
                    {Icon && <Icon />}
                    {text}
                </a>
            </Link>
        </Li>
    )
}

export default navLink
