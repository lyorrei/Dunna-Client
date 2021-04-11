import { CardElement, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { Container, HeaderContainer } from '../../styles/pages/checkout'
import { InlineButton } from '../button'
import { ButtonsContainer } from './style'

const cartElementOptions = {
    style: {
        base: {
            fontSize: '1.4rem',
            color: '#333'
        }
    },
    hidePostalCode: true
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
}

const checkoutPayment: React.FC<Props> = ({ setStage, stage }) => {
    const stripe = useStripe()
    const [isCompleted, setIsCompleted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (stage === 1) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
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

            <CardElement
                onChange={target => HandleCardChange(target)}
                options={cartElementOptions}
            />
            <ButtonsContainer>
                <div>
                    <InlineButton onClick={() => setStage(0)} light>
                        Voltar
                    </InlineButton>
                </div>

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
