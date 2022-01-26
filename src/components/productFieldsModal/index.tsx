import React, { useState } from 'react'
import axios from '../../../axios'

import Modal from '../modal'
import Alert, { Types } from '../alert'
import Loader from '../loader'
import { Input } from '../input/style'
import { InlineButton } from '../button'

import { StonesAndShapes } from '../../pages/shop/[type]'

import { ButtonContainer } from './style'

interface Props {
    title: string
    showModal: boolean
    setShowModal(boolean: boolean): void
    createLink: string
    options: StonesAndShapes[]
    setOptions(options: StonesAndShapes[]): void
}

const productFieldModal: React.FC<Props> = ({
    title,
    showModal,
    setShowModal,
    createLink,
    options,
    setOptions
}) => {
    const [optionName, setOptionName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const closeModal = () => {
        setShowModal(false)
        setError(null)
        setOptionName(null)
        setLoading(false)
    }

    const createOption = async () => {
        try {
            setLoading(true)
            const { data: createdShape } = await axios.post(createLink, {
                name: optionName
            })
            const optionsCopy = [...options]
            optionsCopy.push(createdShape)
            setOptions(optionsCopy)

            closeModal()
        } catch (error) {
            setLoading(false)
            setError(error.response.data.error)
        }
    }

    let modalContent = (
        <>
            {error && (
                <Alert close={() => setError(null)} type={Types.red}>
                    {error}
                </Alert>
            )}
            <Input
                style={{ marginTop: '1rem' }}
                value={optionName}
                onChange={e => setOptionName(e.target.value)}
            />
            <ButtonContainer>
                <InlineButton onClick={createOption}>{title}</InlineButton>
            </ButtonContainer>
        </>
    )

    if (loading) {
        modalContent = <Loader />
    }

    return (
        <Modal title={title} show={showModal} closeModal={closeModal}>
            {modalContent}
        </Modal>
    )
}

export default productFieldModal
