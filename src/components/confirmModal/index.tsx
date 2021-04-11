import React from 'react'
import axios from '../../../axios'
import { Types } from '../alert'
import Alert from '../alert'
import { InlineButton } from '../button'

import Modal from '../modal'

import { ButtonContainer, Paragraph } from './style'

interface Props {
    title: string
    show: boolean
    closeModal(): void
    confirmHandler(): void
    obs?: string
    error?: string
}

const confirmModal: React.FC<Props> = ({
    title,
    show,
    closeModal,
    confirmHandler,
    obs,
    error
}) => {
    return (
        <Modal title={title} show={show} closeModal={closeModal}>
            {obs && <Paragraph>
                <strong>Observação:</strong> {obs}
            </Paragraph>}
            {error && (
                    <div style={{marginBottom: '2rem'}}>
                        <Alert type={Types.red}>{error}</Alert>
                    </div>
                )}
            <ButtonContainer>
                <InlineButton light onClick={closeModal}>
                    Cancelar
                </InlineButton>
                <InlineButton onClick={confirmHandler}>Confirmar</InlineButton>
            </ButtonContainer>
        </Modal>
    )
}

export default confirmModal
