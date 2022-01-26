import React from 'react'

import { User } from '../../pages/me'
import { Paragraph, UserContainer } from './style'

interface Props {
    user: User
}

const orderUser: React.FC<Props> = ({ user }) => {
    return (
        <UserContainer>
            <Paragraph>
                <span>Nome:</span>
                {user.firstName} {user.lastName}
            </Paragraph>
            <Paragraph>
                <span>Email:</span>
                {user.email}
            </Paragraph>
        </UserContainer>
    )
}

export default orderUser
