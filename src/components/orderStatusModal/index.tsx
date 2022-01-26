import React from 'react'
import { InlineButton } from '../button'
import { Input } from '../input/style'

import { ButtonContainer } from './style'

interface Props {
    status: string
    setStatus(status: string): void
    changeStatus(): void
}

const orderStatusModal: React.FC<Props> = ({status, setStatus, changeStatus}) => {
    return (
        <>
            <Input
                defaultValue={status}
                onChange={e => setStatus(e.target.value)}
            />
            <ButtonContainer>
                <InlineButton onClick={() => changeStatus()}>
                    Mudar
                </InlineButton>
            </ButtonContainer>
        </>
    )
}

export default orderStatusModal
