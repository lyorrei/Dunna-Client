import React from 'react'
import { Footer, FooterNavigation, LogoBox, SocialNavigation } from './style'
import Logo from '../../images/logowhite.png'
import Link from 'next/link'
import { RiInstagramFill } from 'react-icons/ri'

interface Props {}

const footer: React.FC<Props> = props => {
    return (
        <Footer>
            <LogoBox>
                <img src={Logo}></img>
            </LogoBox>
            <FooterNavigation>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/shop">
                    <a>Loja</a>
                </Link>
                <Link href="/company">
                    <a>Empresa</a>
                </Link>
                <Link href="/contact">
                    <a>Contato</a>
                </Link>
            </FooterNavigation>
            <SocialNavigation>
                <a
                    target="_blank"
                    href="https://www.instagram.com/dunna.joalheria/"
                    rel="noopener noreferrer"
                >
                    <RiInstagramFill />
                    Instagram
                </a>
            </SocialNavigation>
        </Footer>
    )
}

export default footer
