import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import axios from '../../../axios'
import * as Yup from 'yup'

import { CreateButtonContainer } from '../../styles/pages/coupons'
import { InlineButton } from '../button'
import { CheckboxContainer } from '../checkboxContainer'
import DatePicker from '../datePicker'
import Input from '../input'
import Modal from '../modal'
import { Coupon } from '../../pages/coupons'
import { FormHandles } from '@unform/core'
import Form from '../form'

import Alert, { Types } from '../alert'

interface Props {
    showModal: boolean
    coupons: Coupon[]
    setCoupons: Dispatch<SetStateAction<Coupon[]>>
    setShowModal(boolean: boolean): void
}

const couponCreateModal: React.FC<Props> = ({
    showModal,
    coupons,
    setCoupons,
    setShowModal
}) => {
    const formRef = useRef<FormHandles>(null)

    const [formError, setFormError] = useState(null)

    const [expirable, setExpirable] = useState(false)
    const [validOnce, setValidOnce] = useState(false)

    const handleSubmit = async formData => {
        try {
            // Remove all previous errors
            setFormError(null)
            const validationObject = {
                name: Yup.string().required('O nome é obrigatório'),
                value: Yup.number()
                    .typeError('Você deve escrever um número')
                    .required('O preço é obrigatório'),
                cartMinValue: Yup.number()
                    .typeError('Você deve escrever um número')
                    .required('O preço é obrigatório')
            }

            formRef.current.setErrors({})
            const schema = Yup.object().shape(validationObject)
            await schema.validate(formData, {
                abortEarly: false
            })

            if (parseInt(formData.cartMinValue) <= parseInt(formData.value)) {
                return setFormError(
                    'O valor mínimo da compra deve ser maior que o valor do cupom!'
                )
            }

            if (
                parseInt(formData.cartMinValue) - parseInt(formData.value) <=
                100
            ) {
                return setFormError(
                    'O valor mínimo da compra deve ser pelo menos 1 real maior que o valor do cupom!'
                )
            }

            formData.expirable = expirable
            formData.validOnce = validOnce

            formData.name = formData.name.replace(/\s/g, '')

            // Validation passed
            const { data: createdCoupon } = await axios.post(
                '/coupons/create',
                formData
            )

            const couponsCopy = [...coupons]
            couponsCopy.push(createdCoupon)

            setCoupons(couponsCopy)
            setExpirable(false)
            setValidOnce(false)
            setShowModal(false)
        } catch (err) {
            const validationErrors = {}
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })
                formRef.current.setErrors(validationErrors)
            } else {
                setFormError(err.response.data.error)
            }
        }
    }
    return (
        <Modal
            title="Criar cupom"
            show={showModal}
            closeModal={() => setShowModal(false)}
        >
            {formError && <Alert type={Types.red}>{formError}</Alert>}
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Input name="name" label="Nome" />
                <Input name="value" label="Valor em centavos" type="number" />
                <Input
                    name="cartMinValue"
                    label="Mínimo valor da compra em centavos para cupom ser válido"
                    type="number"
                />

                <CheckboxContainer>
                    <span>Válido apenas uma vez:</span>
                    <input
                        name="validOnce"
                        type="checkbox"
                        checked={validOnce}
                        onChange={e => setValidOnce(e.target.checked)}
                    />
                </CheckboxContainer>

                <CheckboxContainer>
                    <span>Expiração:</span>
                    <input
                        name="expirable"
                        type="checkbox"
                        checked={expirable}
                        onChange={e => setExpirable(e.target.checked)}
                    />
                </CheckboxContainer>

                {expirable && (
                    <DatePicker
                        name="expirableDate"
                        label="Data de expiração:"
                    />
                )}

                <CreateButtonContainer>
                    <InlineButton type="submit">Criar cupom</InlineButton>
                </CreateButtonContainer>
            </Form>
        </Modal>
    )
}

export default couponCreateModal
