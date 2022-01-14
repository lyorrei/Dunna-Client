import React from 'react'
import { Container, Li } from './style'
import Link from 'next/link'
import { BiCart } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillInboxesFill } from 'react-icons/bs'
import { GiMetalBar, GiStoneCrafting } from 'react-icons/gi'
import { FaRegMoneyBillAlt, FaShapes } from 'react-icons/fa'

interface Props {}

const sidebar: React.FC<Props> = props => {
    const router = useRouter()

    return (
        <Container>
            <div>Produtos</div>

            <ul>
                <Li isActive={router.pathname === '/products'}>
                    <Link href="/products">
                        <a>
                            <BiCart />
                            Produtos
                        </a>
                    </Link>
                </Li>
                <Li isActive={router.pathname === '/products/new'}>
                    <Link href="/products/new">
                        <a>
                            <AiOutlinePlus /> Novo Produto
                        </a>
                    </Link>
                </Li>
            </ul>
            <div>Pedidos</div>
            <ul>
                <Li isActive={router.pathname === '/ordersall'}>
                    <Link href="/ordersall">
                        <a>
                            <BsFillInboxesFill /> Pedidos
                        </a>
                    </Link>
                </Li>
            </ul>
            <div>Opções</div>
            <ul>
                <Li isActive={router.pathname === '/stones'}>
                    <Link href="/stones">
                        <a>
                            <GiStoneCrafting />
                            Pedras
                        </a>
                    </Link>
                </Li>
                <Li isActive={router.pathname === '/shapes'}>
                    <Link href="/shapes">
                        <a>
                            <FaShapes />
                            Formatos
                        </a>
                    </Link>
                </Li>
                <Li isActive={router.pathname === '/metals'}>
                    <Link href="/metals">
                        <a>
                            <GiMetalBar />
                            Metais
                        </a>
                    </Link>
                </Li>
            </ul>
            <div>Extra</div>
            <ul>

                <Li isActive={router.pathname === '/coupons'}>
                    <Link href="/coupons">
                        <a>
                            <FaRegMoneyBillAlt />
                            Cupons
                        </a>
                    </Link>
                </Li>
            </ul>
        </Container>
    )
}

export default sidebar
