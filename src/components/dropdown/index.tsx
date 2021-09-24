import React, { useEffect, useRef } from 'react'

import Link from 'next/link'

import { Container, NavDropdownContainer } from './style'

interface List {
    icon?: any
    text: string
    type: string
    link?: any
    click?: () => void
}

interface Props {
    show: boolean
    setShow(boolean: boolean): void
    list: List[]
    navBox?: boolean
}

const dropdown: React.FC<Props> = ({ show, setShow, list, navBox }) => {
    const node = useRef<HTMLDivElement>()
    const logoutHandler = () => {}

    let mediaQuerry
    if (typeof window !== 'undefined') {
        mediaQuerry = window.matchMedia('(min-width: 50em)')
    }

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return
        }
        // outside click
        setShow(false)
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && mediaQuerry.matches) {
            if (show) {
                document.addEventListener('mousedown', handleClickOutside)
            } else {
                document.removeEventListener('mousedown', handleClickOutside)
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [show])

    if (navBox) {
        return (
            <NavDropdownContainer ref={node}>
                {list.map(el =>
                    el.link ? (
                        <Link key={el.text} href={el.link}>
                            <a key={el.text} href={el.link}>
                                {el.icon && <el.icon />}
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
            </NavDropdownContainer>
        )
    }

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
