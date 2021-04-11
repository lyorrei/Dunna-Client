import React, { useEffect, useRef } from 'react'

import Link from 'next/link'

import { Container } from './style'

import { FaUserCircle } from 'react-icons/fa'
import { RiLogoutBoxLine } from 'react-icons/ri'

interface List {
    icon: any
    text: string
    type: string
    link?: string
    click?: () => void
}

interface Props {
    show: boolean
    setShow(boolean: boolean): void
    list: List[]
}

const dropdown: React.FC<Props> = ({ show, setShow, list }) => {
    const node = useRef<HTMLDivElement>()
    const logoutHandler = () => {}

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return
        }
        // outside click
        setShow(false)
    }

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [show])

    return (
        <Container ref={node}>
            {list.map(el =>
                el.link ? (
                    <Link key={el.text} href={el.link}>
                        <a>
                            <el.icon />
                            {el.text}
                        </a>
                    </Link>
                ) : (
                    <button key={el.text} type="button" onClick={el.click}>
                        <el.icon />
                        {el.text}
                    </button>
                )
            )}
        </Container>
    )
}

export default dropdown
