import React, { useState } from 'react'
import axios from '../../../axios'

import Modal from '../modal'
import Loader from '../loader'
import Alert, { Types } from '../alert'
import { Input } from '../input/style'
import Button from '../button'
import { useUser } from '../../context/User'

interface Props {
    showModal: boolean
    label: string
    field: string
    inputType: string
    inputDefaultValue: string
    closeModal(): void
    loading: boolean
    setLoading(boolean: boolean): void
    formError: string
    setFormError(error: string): void
}

const meModal: React.FC<Props> = ({
    showModal,
    field,
    inputType,
    label,
    closeModal,
    inputDefaultValue,
    loading,
    setLoading,
    formError,
    setFormError
}) => {
    const [inputValue, setInputValue] = useState(null)

    const { setUser } = useUser()

    const handleSubmit = async () => {
        try {
            setLoading(true)

            const formData = {
                [field]: inputValue
            }

            const { data } = await axios.patch('/users/me', formData)
            setUser(data)

            closeModal()
        } catch (err) {
            setFormError(err.response.data.error)
            setLoading(false)
        }
    }

    let modalContent = (
        <>
            {formError && <Alert type={Types.red}>{formError}</Alert>}
            <Input
                onChange={e => setInputValue(e.target.value)}
                type={inputType}
                defaultValue={inputDefaultValue}
            />
            <Button onClick={handleSubmit}>Editar</Button>
        </>
    )

    if (loading) {
        modalContent = <Loader />
    }

    return (
        <Modal
            title={'Editar ' + label}
            show={showModal}
            closeModal={closeModal}
        >
            {modalContent}
        </Modal>
    )
}

export default meModal
