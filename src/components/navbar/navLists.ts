import { FaUserCircle } from 'react-icons/fa'
import { RiLogoutBoxLine } from 'react-icons/ri'

export const shopDropdownList = [
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
]

export const authDropdownList = logoutHandler => [
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
        click: () => logoutHandler()
    }
]

export const linkList = [
    {
        link: '/shop/Men',
        text: 'Men',
        aStyle: { letterSpacing: '0.1rem' }
    },
    {
        link: '/shop/Desconto',
        text: '% OFF',
        aStyle: { letterSpacing: '0.1rem' }
    },
    {
        link: '/company',
        text: 'Empresa'
    },
    {
        link: '/quality',
        text: 'Qualidade'
    },
    {
        link: '/contact',
        text: 'Contato',
        marginRight: true
    }
]
