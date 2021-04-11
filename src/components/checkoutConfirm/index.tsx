import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from '../../../axios'
import { useRouter } from 'next/router'

import { useCart } from '../../context/Cart'
import { Container } from '../../styles/pages/checkout'
import { InlineButton } from '../button'
import { ButtonsContainer, Text, Title } from './style'
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
}

const checkoutConfirm: React.FC<Props> = ({
    setStage,
    stage,
    selectedAddress,
    total
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

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        const cardElement = elements.getElement(CardElement)

        const requestData = {
            cart,
            amount: total,
            addressId: selectedAddress
        }

        try {
            const { data } = await axios.post('/charge', requestData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement
                }
            })
            Router.replace('/checkout/success/' + data.orderId)
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
                    <ButtonsContainer>
                        <div>
                            <InlineButton onClick={() => setStage(1)} light>
                                Voltar
                            </InlineButton>
                        </div>

                        <InlineButton onClick={handleSubmit}>
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
