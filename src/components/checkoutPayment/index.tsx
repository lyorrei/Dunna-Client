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
import { Term, Text } from '../checkoutConfirm/style'
import { BoxContainerVariants } from '../../pages/checkout'

const cartElementOptions = {
    style: {
        base: {
            fontSize: '1.4rem',
            color: '#333'
        }
    }
}

interface Props {
    stage: number
    setStage(stage: number): void
    selectedAddress: string
}

const checkoutPayment: React.FC<Props> = ({
    setStage,
    stage,
    selectedAddress
}) => {
    const stripe = useStripe()
    const [isCompleted, setIsCompleted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()
    const { cart, cartPrice, coupon, setCoupon } = useCart()

    useEffect(() => {
        setIsCompleted(false)
    }, [router.asPath])

    useEffect(() => {
        if (stage === 1) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }

        if (stage === 0 && router.query.method === 'paypal') {
            setIsCompleted(false)
        }
    }, [stage])

    const HandleCardChange = target => {
        setIsCompleted(target.complete)
    }

    return (
        <Container
            variants={BoxContainerVariants}
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
                <>
                    <div style={{ marginBottom: '2rem' }}>
                        <Text>
                            Por favor confirme o endereço e os produtos
                            escolhidos.
                        </Text>
                        <Term>
                            Ao finalizar a compra você concorda com nossa{' '}
                            <a
                                href="/pdfs/terms.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                política de privacidade.
                            </a>
                        </Term>
                    </div>

                    <PaypalButton
                        cart={cart}
                        setIsCompleted={setIsCompleted}
                        total={cartPrice}
                        selectedAddress={selectedAddress}
                        couponName={coupon ? coupon.name : null}
                        setCoupon={setCoupon}
                    />
                </>
            ) : (
                <SvgContainer>
                    <BsCheckCircle />
                </SvgContainer>
            )}

            <ButtonsContainer>
                <div>
                    <InlineButton onClick={() => setStage(0)} light>
                        Voltar
                    </InlineButton>
                </div>
                {router.query.method === 'stripe' && (
                    <InlineButton
                        onClick={() => setStage(2)}
                        disabled={!isCompleted}
                    >
                        Próximo
                    </InlineButton>
                )}
            </ButtonsContainer>
        </Container>
    )
}

export default checkoutPayment
