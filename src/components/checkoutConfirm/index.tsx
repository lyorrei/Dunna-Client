import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from '../../../axios'
import { useRouter } from 'next/router'

import { useCart } from '../../context/Cart'
import { Container } from '../../styles/pages/checkout'
import { InlineButton } from '../button'
import { ButtonsContainer, Term, Text, Title } from './style'
import { ClipLoader } from 'react-spinners'
import Alert, { Types } from '../alert'

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
    total: number
    selectedAddress: string
    orderId: string
}

const checkoutConfirm: React.FC<Props> = ({
    setStage,
    stage,
    selectedAddress,
    total,
    orderId
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { cart } = useCart()
    const elements = useElements()
    const stripe = useStripe()
    const Router = useRouter()

    useEffect(() => {
        if (stage === 2) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [stage])

    const handleStripeSubmit = async () => {
        setLoading(true)
        setError(null)
        const cardElement = elements.getElement(CardElement)

        try {
            const { token } = await stripe.createToken(cardElement)
            const requestData = {
                cart,
                amount: total,
                addressId: selectedAddress,
                paymentData: { token: token.id }
            }

            const { data } = await axios.post('/charge', requestData)
            Router.replace('/checkout/success/' + data.createdOrderId)
        } catch (e) {
            setLoading(false)
            setError(
                'Não foi possível realizar a compra, por favor tente novamente mais tarde. Se o problema persistir, por favor entre em contato conosco.'
            )
        }
    }

    const handlePaypalSubmit = async () => {
        setLoading(true)
        setError(null)

        const requestData = {
            cart,
            amount: total,
            addressId: selectedAddress,
            orderId
        }

        try {
            const { data } = await axios.post('/paypal/capture', requestData)
            Router.replace('/checkout/success/' + data.createdOrderId)
        } catch (e) {
            setLoading(false)
            setError(
                'Não foi possível realizar a compra, por favor tente novamente mais tarde. Se o problema persistir, por favor entre em contato conosco.'
            )
        }
    }

    return (
        <Container
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            exit="hidden"
        >
            <Title>Realizar a compra</Title>
            {error && (
                <div style={{ margin: '2rem 0' }}>
                    <Alert type={Types.red}>{error}</Alert>
                </div>
            )}
            {!loading ? (
                <>
                    <Text>
                        Por favor confirme o endereço e os produtos escolhidos.
                    </Text>
                    <Term>
                        Ao clicar em confirmar você concorda com nossa{' '}
                        <a
                            href="/pdfs/terms.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            política de privacidade.
                        </a>
                    </Term>
                    <ButtonsContainer>
                        <div>
                            <InlineButton onClick={() => setStage(1)} light>
                                Voltar
                            </InlineButton>
                        </div>

                        <InlineButton
                            onClick={
                                Router.query.method === 'stripe'
                                    ? handleStripeSubmit
                                    : handlePaypalSubmit
                            }
                        >
                            Confirmar
                        </InlineButton>
                    </ButtonsContainer>
                </>
            ) : (
                <div style={{ margin: '4rem auto', width: '120px' }}>
                    <ClipLoader color={'#00c2a8'} size={120} />
                </div>
            )}
        </Container>
    )
}

export default checkoutConfirm
