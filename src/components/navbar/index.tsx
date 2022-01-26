import React, { useEffect, useState } from 'react'

import { Nav, LogoBox, NavBox, Li, ToogleBox, NavArrow } from './style'
import Link from 'next/link'
import Logo from '../../images/logo.jpg'

import NavLink from '../navLink'
import NavUserBox from '../navUserBox'
import NavShop from '../navShop'

import { useRouter } from 'next/router'

import { useUser } from '../../context/User'
import { RiAdminFill } from 'react-icons/ri'

import Backdrop from '../backdrop'

import { linkList } from './navLists'

const navbar: React.FC = () => {
    const router = useRouter()
    const [clicked, setClicked] = useState(false)
    const [showShopDropdown, setShowShopDropdown] = useState(false)
    const [showAuthDropdown, setShowAuthDropdown] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        setClicked(false)
        setShowShopDropdown(false)
        setShowAuthDropdown(false)
    }, [router])

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
                    <NavShop
                        clicked={clicked}
                        isBigScreen={isBigScreen}
                        showShopDropdown={showShopDropdown}
                        setShowShopDropdown={setShowShopDropdown}
                    />

                    {linkList.map(navLink => (
                        <NavLink
                            link={navLink.link}
                            text={navLink.text}
                            aStyle={navLink.aStyle}
                            clicked={clicked}
                            marginRight={navLink.marginRight}
                        />
                    ))}

                    {user && user.admin && (
                        <NavLink
                            link={'/products'}
                            Icon={RiAdminFill}
                            text={' Admin'}
                            clicked={clicked}
                        />
                    )}
                    <NavUserBox
                        clicked={clicked}
                        isBigScreen={isBigScreen}
                        showAuthDropdown={showAuthDropdown}
                        setShowAuthDropdown={setShowAuthDropdown}
                    />
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
