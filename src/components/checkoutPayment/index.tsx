import { CardElement, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { Container, HeaderContainer } from '../../styles/pages/checkout'
import { InlineButton } from '../button'
import { ButtonsContainer, SvgContainer, Message } from './style'
import PaypalButton from '../paypalButton'
import { useRouter } from 'next/router'
import { useCart } from '../../context/Cart'
import { BsCheckCircle } from 'react-icons/bs'
import Link from 'next/link'

const cartElementOptions = {
    style: {
        base: {
            fontSize: '1.4rem',
            color: '#333'
        }
    }
}

const containerVariants = {
    hidden: {
        opacity: 0,
        y: '-120%'
    },
    visible: {
        opacity: 1,
        y: '0%'
    }
}

interface Props {
    stage: number
    setStage(stage: number): void
    orderId: string
    setOrderId(id: string): void
    total: number
    selectedAddress: string
}

const checkoutPayment: React.FC<Props> = ({
    setStage,
    stage,
    orderId,
    setOrderId,
    total,
    selectedAddress
}) => {
    const stripe = useStripe()
    const [isCompleted, setIsCompleted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()
    const { cart } = useCart()

    useEffect(() => {
        if (stage === 1) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        if (stage === 0 && router.query.method === 'paypal') {
            setIsCompleted(false)
            setOrderId(null)
        }
    }, [stage])

    const HandleCardChange = target => {
        setIsCompleted(target.complete)
    }

    return (
        <Container
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            exit="hidden"
        >
            <HeaderContainer>
                <h2>Pagamento</h2>
            </HeaderContainer>

            {router.query.method === 'stripe' ? (
                <>
                    <Message>
                        Atualmente aceitamos parcelamento apenas por{' '}
                        <Link href="/checkout?method=paypal">Paypal</Link>
                    </Message>
                    <CardElement
                        onChange={target => HandleCardChange(target)}
                        options={cartElementOptions}
                    />
                </>
            ) : !isCompleted ? (
                <PaypalButton
                    cart={cart}
                    setIsCompleted={setIsCompleted}
                    orderId={orderId}
                    setOrderId={setOrderId}
                    total={total}
                    selectedAddress={selectedAddress}
                />
            ) : (
                <SvgContainer>
                    <BsCheckCircle />
                </SvgContainer>
            )}

            <ButtonsContainer>
                {router.query.method === 'stripe' && (
                    <div>
                        <InlineButton onClick={() => setStage(0)} light>
                            Voltar
                        </InlineButton>
                    </div>
                )}

                <InlineButton
                    onClick={() => setStage(2)}
                    disabled={!isCompleted}
                >
                    Próximo
                </InlineButton>
            </ButtonsContainer>
        </Container>
    )
}

export default checkoutPayment
