import React from 'react'
import Link from 'next/link'

import { Address } from '../../pages/addresses'
import { User } from '../../pages/me'
import { AddressBox, EditIcon, TrashIcon } from './style'

interface Props {
    address: Address
    user: User
    openConfirmModal(id: string): void
}

const addressBox: React.FC<Props> = ({ address, user, openConfirmModal }) => {
    return (
        <AddressBox key={address._id}>
            <p>
                {user.firstName} {user.lastName}
            </p>
            <p>
                {address.street} {address.number}
            </p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            {address.additional_info && <p>{address.additional_info}</p>}
            <p>
                <span>CEP:</span> {address.zip}
            </p>

            <p>
                <span>Telefone:</span> {address.phone}
            </p>
            <div>
                <Link href={'/addresses/edit/' + address._id}>
                    <a>
                        <EditIcon />
                    </a>
                </Link>
                <TrashIcon onClick={() => openConfirmModal(address._id)} />
            </div>
        </AddressBox>
    )
}

export default addressBox
