import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../axios'
import { useRouter } from 'next/router'

import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'
import { InlineButton } from '../button'

import { Form, SideBySide, Title } from './style'

import Input from '../input'
import Select from '../select'
import Loader from '../loader'
import Alert, { Types } from '../alert'
import { CheckboxContainer } from '../checkboxContainer'

import { StonesAndShapes } from '../../pages/shop/[type]'
import { ProductInterface } from '../product'

interface Props {
    submitLink: string
    submitType?: string
    title: string
    formInitialData?: ProductInterface
    stones: StonesAndShapes[]
    shapes: StonesAndShapes[]
    types: StonesAndShapes[]
    productTypes: StonesAndShapes[]
    metals: StonesAndShapes[]
    setFormData?: (data: FormData) => void
    setStage?: (stage: number) => void
    noLoading?: boolean
}

const productForm: React.FC<Props> = ({
    submitLink,
    submitType,
    formInitialData,
    title,
    stones,
    shapes,
    setFormData,
    setStage,
    noLoading,
    types,
    metals,
    productTypes
}) => {
    const [formError, setFormError] = useState(null)
    const formRef = useRef<FormHandles>(null)
    const [loading, setLoading] = useState(false)

    const Router = useRouter()
    const [selectedType, setSelectedType] = useState(null)

    const [stonesOptions, setStoneOptions] = useState(null)
    const [shapesOptions, setShapeOptions] = useState(null)
    const [productTypesOptions, setProductTypesOption] = useState(null)
    const [typesOptions, setTypesOption] = useState(null)
    const [metalsOptions, setMetalsOptions] = useState(null)

    const [visible, setVisible] = useState(false)
    const [notBuyable, setNotBuyable] = useState(false)
    const [spotlight, setSpotlight] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [forMen, setForMen] = useState(false)
    const [forWedding, setForWedding] = useState(false)

    const optionsToArray = (options: StonesAndShapes[]) => {
        return options.map(option => ({
            value: option._id,
            label: option.name
        }))
    }

    useEffect(() => {
        if (formInitialData) {
            setSelectedType(formInitialData.productType.label)
            setVisible(formInitialData.visible)
            setNotBuyable(formInitialData.notBuyable)
            setSpotlight(formInitialData.spotlight)
            setDiscount(formInitialData.discount)
            setForMen(formInitialData.forMen)
            setForWedding(formInitialData.forWedding)
        }
    }, [formInitialData])

    useEffect(() => {
        const stonesArray = optionsToArray(stones)
        setStoneOptions(stonesArray)

        const shapesArray = optionsToArray(shapes)
        setShapeOptions(shapesArray)

        const productTypesArray = optionsToArray(productTypes)
        setProductTypesOption(productTypesArray)

        const typesArray = optionsToArray(types)
        setTypesOption(typesArray)

        const metalsArray = optionsToArray(metals)
        setMetalsOptions(metalsArray)
    }, [stones, shapes, types, metals])

    const handleSubmit = async formData => {
        try {
            // Remove all previous errors
            setFormError(null)

            if (selectedType === null) {
                return setFormError(
                    'Por favor, preencha o campo tipo do Produto'
                )
            }

            let validationObject: any = {}
            if (selectedType === 'Joia') {
                validationObject = {
                    productType: Yup.string().required(
                        'O tipo de produto ?? obrigat??rio'
                    ),
                    stock_id: Yup.string()
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O id do estoque ?? obrigat??rio'),
                    name: Yup.string().required('O nome ?? obrigat??rio'),
                    description: Yup.string().required(
                        'A descri????o ?? obrigat??ria'
                    ),
                    price: Yup.number()
                        .positive('Voc?? deve escrever um n??mero positivo')
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O pre??o ?? obrigat??rio'),
                    stone: Yup.string().required('A pedra ?? obrigat??ria'),
                    stoneWeigth: Yup.number()
                        .positive('Voc?? deve escrever um n??mero positivo')
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O peso da pedra ?? obrigat??rio'),
                    diamondWeigth: Yup.number()
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O peso do diamante ?? obrigat??rio'),
                    shape: Yup.string().required('O formato ?? obrigat??rio'),
                    metal: Yup.string().required('O metal ?? obrigat??rio'),
                    type: Yup.string().required('O tipo ?? obrigat??rio')
                }
            } else {
                validationObject = {
                    productType: Yup.string().required(
                        'O tipo de produto ?? obrigat??rio'
                    ),
                    stock_id: Yup.string()
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O id do estoque ?? obrigat??rio'),
                    name: Yup.string().required('O nome ?? obrigat??rio'),
                    description: Yup.string().required(
                        'A descri????o ?? obrigat??ria'
                    ),
                    price: Yup.number()
                        .positive('Voc?? deve escrever um n??mero positivo')
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O pre??o ?? obrigat??rio'),
                    stone: Yup.string().required('A pedra ?? obrigat??ria'),
                    stoneWeigth: Yup.number()
                        .positive('Voc?? deve escrever um n??mero positivo')
                        .typeError('Voc?? deve escrever um n??mero')
                        .required('O peso da pedra ?? obrigat??rio'),
                    shape: Yup.string().required('O formato ?? obrigat??rio')
                }
            }

            if (discount) {
                validationObject.totalPrice = Yup.number()
                    .positive('Voc?? deve escrever um n??mero positivo')
                    .typeError('Voc?? deve escrever um n??mero')
                    .required('O pre??o ?? obrigat??rio')

                if (parseInt(formData.totalPrice) <= parseInt(formData.price)) {
                    return setFormError(
                        'O Valor do campo Pre??o com Desconto deve ser menor que o do campo Pre??o sem Desconto'
                    )
                }
            }

            formRef.current.setErrors({})
            const schema = Yup.object().shape(validationObject)
            await schema.validate(formData, {
                abortEarly: false
            })

            formData.visible = visible
            formData.notBuyable = notBuyable
            formData.spotlight = spotlight
            formData.discount = discount
            formData.forMen = forMen
            formData.forWedding = forWedding

            // Validation passed
            if (!noLoading) {
                setLoading(true)
            }
            if (setFormData) {
                setFormData(formData)
            }
            if (setStage) {
                setStage(1)
            }
            if (submitType === 'post') {
                await axios.post(submitLink, formData)
                Router.replace('/products')
            } else if (submitType === 'patch') {
                await axios.patch(submitLink, formData)
                Router.replace('/products')
            }
        } catch (err) {
            const validationErrors = {}
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                })
                formRef.current.setErrors(validationErrors)
            } else {
                setFormError(err.response.data.error)
                setLoading(false)
            }
        }
    }

    return (
        <>
            <Title>{title}</Title>
            <Form
                loading={loading ? 1 : 0}
                ref={formRef}
                onSubmit={handleSubmit}
                initialData={formInitialData}
            >
                {formError && (
                    <div>
                        <Alert type={Types.red}>{formError}</Alert>
                    </div>
                )}
                <Select
                    label="Tipo do produto"
                    input
                    name="productType"
                    options={productTypesOptions}
                    placeholder="Escolha um tipo do produto"
                    onChange={e => setSelectedType(e.label)}
                />
                <SideBySide>
                    <Input name="stock_id" label="Id do estoque" />
                    <Input name="name" label="Nome" />
                </SideBySide>

                <Input name="description" label="Descri????o" />
                <SideBySide>
                    <Select
                        label="Pedra"
                        input
                        name="stone"
                        options={stonesOptions}
                        placeholder="Escolha uma pedra"
                    />
                    <Select
                        label="Formato"
                        input
                        name="shape"
                        options={shapesOptions}
                        placeholder="Escolha um formato"
                    />
                </SideBySide>

                <Input
                    name="stoneWeigth"
                    type="number"
                    label="Peso da pedra"
                    step=".01"
                />

                {selectedType === 'Joia' && (
                    <>
                        <SideBySide>
                            <Select
                                label="Tipo"
                                input
                                name="type"
                                options={typesOptions}
                                placeholder="Escolha um tipo"
                            />

                            <Select
                                label="Metal"
                                input
                                name="metal"
                                options={metalsOptions}
                                placeholder="Escolha um metal"
                            />
                        </SideBySide>
                        <Input
                            name="diamondWeigth"
                            type="number"
                            label="Peso do diamante"
                            step=".01"
                        />
                    </>
                )}

                <SideBySide>
                    <Input
                        name="price"
                        type="number"
                        label={
                            discount
                                ? 'Pre??o com desconto em centavos'
                                : 'Pre??o em centavos'
                        }
                    />
                    {discount && (
                        <Input
                            name="totalPrice"
                            type="number"
                            label="Pre??o sem desconto em centavos"
                        />
                    )}
                </SideBySide>

                <SideBySide>
                    <CheckboxContainer>
                        <span>Vis??vel:</span>
                        <input
                            name="visible"
                            type="checkbox"
                            checked={visible}
                            onChange={e => setVisible(e.target.checked)}
                        />
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <span>Sob Consulta:</span>
                        <input
                            name="notBuyable"
                            type="checkbox"
                            checked={notBuyable}
                            onChange={e => setNotBuyable(e.target.checked)}
                        />
                    </CheckboxContainer>
                </SideBySide>

                <SideBySide>
                    <CheckboxContainer>
                        <span>Destaque:</span>
                        <input
                            name="spotlight"
                            type="checkbox"
                            checked={spotlight}
                            onChange={e => setSpotlight(e.target.checked)}
                        />
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <span>Desconto:</span>
                        <input
                            name="discount"
                            type="checkbox"
                            checked={discount}
                            onChange={e => setDiscount(e.target.checked)}
                        />
                    </CheckboxContainer>
                </SideBySide>
                <SideBySide>
                    <CheckboxContainer>
                        <span>Masculina:</span>
                        <input
                            name="forMen"
                            type="checkbox"
                            checked={forMen}
                            onChange={e => setForMen(e.target.checked)}
                        />
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <span>Casamento:</span>
                        <input
                            name="forWedding"
                            type="checkbox"
                            checked={forWedding}
                            onChange={e => setForWedding(e.target.checked)}
                        />
                    </CheckboxContainer>
                </SideBySide>
                <InlineButton type="submit">
                    {submitType === 'patch' ? 'Editar' : 'Pr??ximo'}
                </InlineButton>
            </Form>

            {loading && <Loader />}
        </>
    )
}

export default productForm
