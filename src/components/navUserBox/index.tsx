import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { FaUser } from 'react-icons/fa'

import { useCart } from '../../context/Cart'
import { useUser } from '../../context/User'

import { Li, NavArrow } from '../navbar/style'

import { authDropdownList } from '../navbar/navLists'

import Dropdown from '../dropdown'

interface Props {
    clicked: boolean
    isBigScreen: boolean
    showAuthDropdown: boolean
    setShowAuthDropdown(boolean: boolean): void
}

const navUserBox: React.FC<Props> = ({
    clicked,
    isBigScreen,
    showAuthDropdown,
    setShowAuthDropdown
}) => {
    const Router = useRouter()
    const { user, handleLogout } = useUser()
    const { setCart, setTempProduct } = useCart()

    const navLogout = () => {
        setShowAuthDropdown(false)
        setCart([])
        setTempProduct(null)
        handleLogout('/auth')
    }

    return (
        <Li isClicked={clicked} isActive={Router.pathname === '/auth'}>
            {user ? (
                <div>
                    <button onClick={() => setShowAuthDropdown(true)}>
                        <FaUser />
                        {user.firstName}
                    </button>
                    {!isBigScreen && (
                        <NavArrow
                            onClick={() =>
                                setShowAuthDropdown(!showAuthDropdown)
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
                    list={authDropdownList(navLogout)}
                />
            )}
        </Li>
    )
}

export default navUserBox
