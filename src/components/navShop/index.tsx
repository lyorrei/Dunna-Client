import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Li, NavArrow } from '../navbar/style'

import Dropdown from '../dropdown'

import { shopDropdownList } from '../navbar/navLists'

interface Props {
    clicked: boolean
    isBigScreen: boolean
    showShopDropdown: boolean
    setShowShopDropdown(boolean: boolean): void
}

const navShop: React.FC<Props> = ({
    clicked,
    isBigScreen,
    showShopDropdown,
    setShowShopDropdown
}) => {
    const Router = useRouter()

    return (
        <Li
            isClicked={clicked}
            onMouseEnter={() => (isBigScreen ? setShowShopDropdown(true) : {})}
            onMouseLeave={() => (isBigScreen ? setShowShopDropdown(false) : {})}
            isActive={Router.pathname === '/shop'}
        >
            <div>
                <Link href="/shop">
                    <a>Loja</a>
                </Link>

                <NavArrow
                    onClick={() => setShowShopDropdown(!showShopDropdown)}
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
    )
}

export default navShop
