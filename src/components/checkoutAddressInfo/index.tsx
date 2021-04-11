import React, { useEffect, useState } from 'react'
import { Address } from '../../pages/addresses'
import { User } from '../../pages/me'
import { Container, Title, UserInfo } from './style'

const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

interface Props {
    selectedAddress: string
    myAddresses: Address[]
    user: User
}

const checkoutAddressInfo: React.FC<Props> = ({
    selectedAddress,
    myAddresses,
    user
}) => {
    const [address, setAddress] = useState<Address>(null)

    useEffect(() => {
        const findAddress = myAddresses.find(add => add._id === selectedAddress)
        setAddress(findAddress)
    }, [selectedAddress])

    if (address) {
        return (
            <Container
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <Title>Endereço</Title>
                <UserInfo>
                    {user.firstName} {user.lastName}
                </UserInfo>
                <p>
                    {address.state}, {address.city}, {address.street}{' '}
                    {address.number}
                </p>
                <p>
                    CEP: {address.zip}, Celular: {address.phone}
                </p>
                {address.additional_info && <p>{address.additional_info}</p>}
            </Container>
        )
    }

    return null
}

export default checkoutAddressInfo
