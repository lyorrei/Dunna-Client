import React from 'react'
import Link from 'next/link'

import { CheckoutButton } from '../button'
import { useHistory } from '../../context/History'
import { Methods, CartButtonContainer } from './style'

interface Props {}

const cartButtons: React.FC<Props> = props => {
    const { addToHistory } = useHistory()

    return (
        <>
            <Methods>Pagamento através de todos os cartões via:</Methods>

            <CartButtonContainer>
                <Link href={'/checkout?method=stripe'}>
                    <CheckoutButton
                        onClick={() => addToHistory('/checkout?method=stripe')}
                        right
                    >
                        Stripe
                    </CheckoutButton>
                </Link>
                <Link href={'/checkout?method=paypal'}>
                    <CheckoutButton
                        onClick={() => addToHistory('/checkout?method=paypal')}
                    >
                        Paypal
                    </CheckoutButton>
                </Link>
            </CartButtonContainer>
        </>
    )
}

export default cartButtons
