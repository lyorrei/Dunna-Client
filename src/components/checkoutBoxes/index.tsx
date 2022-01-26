import React, { useState } from 'react'

import { Address } from '../../pages/addresses'
import { User } from '../../pages/me'
import { useRouter } from 'next/router'

import CheckoutStage from '../checkoutStage'
import CheckoutAddress from '../checkoutAddress'
import CheckoutPayment from '../checkoutPayment'
import CheckoutCart from '../checkoutCart'
import CheckoutConfirm from '../checkoutConfirm'
import CheckoutAddressInfo from '../checkoutAddressInfo'

interface Props {
    myAddresses: Address[]
    user: User
}

const checkoutBoxes: React.FC<Props> = ({ myAddresses, user }) => {
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [stage, setStage] = useState(0)
    const Router = useRouter()

    return (
        <>
            <CheckoutStage stage={stage} />

            <CheckoutAddress
                myAddresses={myAddresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                stage={stage}
                setStage={setStage}
            />

            <CheckoutPayment
                stage={stage}
                setStage={setStage}
                selectedAddress={selectedAddress}
            />

            {Router.query.method === 'stripe' && (
                <CheckoutConfirm
                    selectedAddress={selectedAddress}
                    stage={stage}
                    setStage={setStage}
                />
            )}

            <CheckoutCart />

            {selectedAddress && stage !== 0 && (
                <CheckoutAddressInfo
                    selectedAddress={selectedAddress}
                    myAddresses={myAddresses}
                    user={user}
                />
            )}
        </>
    )
}

export default checkoutBoxes
