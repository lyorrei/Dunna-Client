import React from 'react'

import { Types } from '../alert'

import Modal from '../modal'
import Loader from '../loader'
import Alert from '../alert'
import { InlineButton } from '../button'

import { ButtonContainer, Paragraph } from './style'

interface Props {
    title: string
    show: boolean
    closeModal(): void
    confirmHandler(): void
    loading: boolean
    obs?: string
    error?: string
}

const confirmModal: React.FC<Props> = ({
    title,
    show,
    closeModal,
    confirmHandler,
    obs,
    error,
    loading
}) => {
    let modalContent = (
        <>
            {obs && (
                <Paragraph>
                    <strong>Observação:</strong> {obs}
                </Paragraph>
            )}
            {error && (
                <div style={{ marginBottom: '2rem' }}>
                    <Alert type={Types.red}>{error}</Alert>
                </div>
            )}
            <ButtonContainer>
                <InlineButton light onClick={closeModal}>
                    Cancelar
                </InlineButton>
                <InlineButton onClick={confirmHandler}>Confirmar</InlineButton>
            </ButtonContainer>
        </>
    )
    if (loading) {
        modalContent = <Loader />
    }

    return (
        <Modal title={title} show={show} closeModal={closeModal}>
            {modalContent}
        </Modal>
    )
}

export default confirmModal
