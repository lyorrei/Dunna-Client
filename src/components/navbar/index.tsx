import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../axios'

import { Nav, LogoBox, NavBox, Li, ToogleBox } from './style'
import Link from 'next/link'
import Logo from '../../images/logo.jpg'

import { FaUser, FaUserCircle } from 'react-icons/fa'

import Dropdown from '../dropdown'

import { useRouter } from 'next/router'

import { useUser } from '../../context/User'
import {
    RiAdminFill,
    RiArrowDropDownLine,
    RiLogoutBoxLine
} from 'react-icons/ri'

const navbar: React.FC = () => {
    const router = useRouter()
    const [clicked, setClicked] = useState(false)
    const [showShopDropdown, setShowShopDropdown] = useState(false)
    const [showAuthDropdown, setShowAuthDropdown] = useState(false)
    const { user, setUser } = useUser()

    useEffect(() => {
        setClicked(false)
        setShowAuthDropdown(false)
    }, [router])

    const handleLogout = async () => {
        await axios.post('/users/logout')
        setUser(null)
        setShowAuthDropdown(false)
        router.replace('/auth')
    }

    const [shopDropdownList] = useState([
        {
            text: 'Anéis',
            type: 'link',
            link: '/shop/products?type=Anel'
        },
        {
            text: 'Brincos',
            type: 'link',
            link: '/shop/products?type=Brinco'
        },
        {
            text: 'Colares',
            type: 'link',
            link: '/shop/products?type=Colar'
        },
        {
            text: 'Pingentes',
            type: 'link',
            link: '/shop/products?type=Pingente'
        },
        {
            text: 'Pulseiras',
            type: 'link',
            link: '/shop/products?type=Pulseira'
        },
        {
            text: 'Gemas',
            type: 'link',
            link: '/shop/products?type=Gema'
        }
    ])

    const [authDropdownList] = useState([
        {
            icon: FaUserCircle,
            text: 'Minha conta',
            type: 'link',
            link: '/myaccount'
        },
        {
            icon: RiLogoutBoxLine,
            text: 'Logout',
            type: 'button',
            click: () => handleLogout()
        }
    ])

    let mediaQuerry
    if (typeof window !== 'undefined') {
        mediaQuerry = window.matchMedia('(min-width: 43.75em)')
    }

    return (
        <Nav>
            <LogoBox>
                <Link href="/">
                    <img src={Logo} alt="Logo" />
                </Link>
            </LogoBox>
            <NavBox isClicked={clicked}>
                <Li isClicked={clicked} isActive={router.pathname === '/'}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </Li>
                <Li
                    isClicked={clicked}
                    onMouseEnter={() => setShowShopDropdown(true)}
                    onMouseLeave={() => setShowShopDropdown(false)}
                    isActive={router.pathname === '/shop'}
                >
                    <Link href="/shop">
                        <a>
                            Loja
                            {typeof window !== 'undefined' &&
                                mediaQuerry.matches && (
                                    <RiArrowDropDownLine
                                        style={{ marginRight: '-.8rem' }}
                                    />
                                )}
                        </a>
                    </Link>

                    {showShopDropdown && (
                        <Dropdown
                            show={showShopDropdown}
                            setShow={setShowShopDropdown}
                            list={shopDropdownList}
                            horizontal
                        />
                    )}
                </Li>
                <Li
                    isClicked={clicked}
                    isActive={router.pathname === '/company'}
                >
                    <Link href="/company">
                        <a>Empresa</a>
                    </Link>
                </Li>
                <Li
                    isClicked={clicked}
                    isActive={router.pathname === '/quality'}
                >
                    <Link href="/quality">
                        <a>Qualidade</a>
                    </Link>
                </Li>
                <Li
                    isClicked={clicked}
                    isActive={router.pathname === '/contact'}
                    marginRight
                >
                    <Link href="/contact">
                        <a>Contato</a>
                    </Link>
                </Li>

                {user && user.admin && (
                    <Li isClicked={clicked} isActive={false}>
                        <Link href="/products">
                            <a>
                                <RiAdminFill /> Admin
                            </a>
                        </Link>
                    </Li>
                )}

                <Li isClicked={clicked} isActive={router.pathname === '/auth'}>
                    {user ? (
                        <button onClick={() => setShowAuthDropdown(true)}>
                            <FaUser />
                            {user.firstName}
                        </button>
                    ) : (
                        <Link href="/auth">
                            <a>Entrar / Criar Conta</a>
                        </Link>
                    )}
                    {showAuthDropdown && (
                        <Dropdown
                            show={showAuthDropdown}
                            setShow={setShowAuthDropdown}
                            list={authDropdownList}
                        />
                    )}
                </Li>
            </NavBox>
            <ToogleBox isClicked={clicked} onClick={() => setClicked(!clicked)}>
                <span>&nbsp;</span>
            </ToogleBox>
        </Nav>
    )
}

export default navbar
