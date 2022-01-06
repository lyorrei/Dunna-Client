import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import { Nav, LogoBox, NavBox, Li, ToogleBox, NavArrow } from './style'
import Link from 'next/link'
import Logo from '../../images/logo.jpg'

import { FaUser, FaUserCircle } from 'react-icons/fa'

import Dropdown from '../dropdown'

import { useRouter } from 'next/router'

import { useUser } from '../../context/User'
import { RiAdminFill, RiLogoutBoxLine } from 'react-icons/ri'

import Backdrop from '../backdrop'
import { useCart } from '../../context/Cart'
import { useCookies } from 'react-cookie'

const navbar: React.FC = () => {
    const router = useRouter()
    const [clicked, setClicked] = useState(false)
    const [showShopDropdown, setShowShopDropdown] = useState(false)
    const [showAuthDropdown, setShowAuthDropdown] = useState(false)
    const { user, setUser } = useUser()
    const { setCart, setTempProduct } = useCart()
    const [cartCookie, setCartCookie, removeCartCookie] = useCookies(['rdcart'])
    const [checkoutCookie, setCheckoutCookie, removeCheckoutCookie] =
        useCookies(['rdcheckout'])

    useEffect(() => {
        setClicked(false)
        setShowShopDropdown(false)
        setShowAuthDropdown(false)
    }, [router])

    const handleLogout = async () => {
        await axios.post('/users/logout')

        setCart([])
        setTempProduct(null)
        setUser(null)
        setShowAuthDropdown(false)

        removeCartCookie('rdcart', {
            path: '/',
            maxAge: 60 * 60 * 24 * 11 // 11 dias
        })
        removeCheckoutCookie('rdcheckout', {
            path: '/'
            // Session
        })

        router.replace('/auth')
    }

    const [shopDropdownList] = useState([
        {
            text: 'Anéis',
            type: 'link',
            link: '/shop/Anel'
        },
        {
            text: 'Brincos',
            type: 'link',
            link: '/shop/Brinco'
        },
        {
            text: 'Colares',
            type: 'link',
            link: '/shop/Colar'
        },
        {
            text: 'Pingentes',
            type: 'link',
            link: '/shop/Pingente'
        },
        {
            text: 'Pulseiras',
            type: 'link',
            link: '/shop/Pulseira'
        },
        {
            text: 'Gemas',
            type: 'link',
            link: '/shop/Gema'
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
        mediaQuerry = window.matchMedia('(min-width: 50em)')
    }

    const isBigScreen = typeof window !== 'undefined' && mediaQuerry.matches

    return (
        <>
            <Nav>
                <LogoBox>
                    <Link href="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </LogoBox>
                <NavBox isClicked={clicked}>
                    {/* <Li isClicked={clicked} isActive={router.pathname === '/'}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </Li> */}.
                    <Li
                        isClicked={clicked}
                        onMouseEnter={() =>
                            isBigScreen ? setShowShopDropdown(true) : {}
                        }
                        onMouseLeave={() =>
                            isBigScreen ? setShowShopDropdown(false) : {}
                        }
                        isActive={router.pathname === '/shop'}
                    >
                        <div>
                            <Link href="/shop">
                                <a>Loja</a>
                            </Link>

                            <NavArrow
                                onClick={() =>
                                    setShowShopDropdown(!showShopDropdown)
                                }
                                showshopdropdown={showShopDropdown}
                            />
                        </div>

                        {showShopDropdown && (
                            <Dropdown
                                show={showShopDropdown}
                                setShow={setShowShopDropdown}
                                list={shopDropdownList}
                                navBox
                            />
                        )}
                    </Li>
                    <Li
                        isClicked={clicked}
                        isActive={
                            router.pathname === '/shop/products' &&
                            router.query.type === 'Men'
                        }
                    >
                        <Link href="/shop/Men">
                            <a style={{ letterSpacing: '0.1rem' }}>Men</a>
                        </Link>
                    </Li>
                    <Li
                        isClicked={clicked}
                        isActive={
                            router.pathname === '/shop/products' &&
                            router.query.type === 'Desconto'
                        }
                    >
                        <Link href="/shop/Desconto">
                            <a style={{ letterSpacing: '0.1rem' }}>% OFF</a>
                        </Link>
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

                    <Li
                        isClicked={clicked}
                        isActive={router.pathname === '/auth'}
                    >
                        {user ? (
                            <div>
                                <button
                                    onClick={() => setShowAuthDropdown(true)}
                                >
                                    <FaUser />
                                    {user.firstName}
                                </button>
                                {!isBigScreen && (
                                    <NavArrow
                                        onClick={() =>
                                            setShowAuthDropdown(
                                                !showAuthDropdown
                                            )
                                        }
                                        showshopdropdown={showAuthDropdown}
                                    />
                                )}
                            </div>
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
                <ToogleBox
                    isClicked={clicked}
                    onClick={() => setClicked(!clicked)}
                >
                    <span>&nbsp;</span>
                </ToogleBox>
            </Nav>
            <Backdrop click={() => setClicked(false)} show={clicked} />
        </>
    )
}

export default navbar
