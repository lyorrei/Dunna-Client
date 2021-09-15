import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'
import axios from '../../../axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { InlineButton } from '../button'
import Input from '../input'
import Select from '../select'
import { CheckboxContainer, Form, SideBySide, Title } from './style'
import { Address } from '../../pages/addresses'
import { StonesAndShapes } from '../../pages/shop/products'
import { ProductInterface } from '../product'
import Alert, { Types } from '../alert'

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
    const [spotlight, setSpotlight] = useState(false)

    const [discount, setDiscount] = useState(false)

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
            setSpotlight(formInitialData.spotlight)
            setDiscount(formInitialData.discount)
        }
    }, [formInitialData])

    useEffect(() => {
        const stonesArray = optionsToArray(stones)
        setStoneOptions(stonesArray)
        console.log(stonesOptions)

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
                        'O tipo de produto é obrigatório'
                    ),
                    stock_id: Yup.string()
                        .typeError('Você deve escrever um número')
                        .required('O id do estoque é obrigatório'),
                    name: Yup.string().required('O nome é obrigatório'),
                    description: Yup.string().required(
                        'A descrição é obrigatória'
                    ),
                    price: Yup.number()
                        .typeError('Você deve escrever um número')
                        .required('O preço é obrigatório'),
                    stone: Yup.string().required('A pedra é obrigatória'),
                    stoneWeigth: Yup.number()
                        .typeError('Você deve escrever um número')
                        .required('O peso da pedra é obrigatório'),
                    diamondWeigth: Yup.number()
                        .typeError('Você deve escrever um número')
                        .required('O peso do diamante é obrigatório'),
                    shape: Yup.string().required('O formato é obrigatório'),
                    metal: Yup.string().required('O metal é obrigatório'),
                    type: Yup.string().required('O tipo é obrigatório')
                }
            } else {
                validationObject = {
                    productType: Yup.string().required(
                        'O tipo de produto é obrigatório'
                    ),
                    stock_id: Yup.string()
                        .typeError('Você deve escrever um número')
                        .required('O id do estoque é obrigatório'),
                    name: Yup.string().required('O nome é obrigatório'),
                    description: Yup.string().required(
                        'A descrição é obrigatória'
                    ),
                    price: Yup.number()
                        .typeError('Você deve escrever um número')
                        .required('O preço é obrigatório'),
                    stone: Yup.string().required('A pedra é obrigatória'),
                    stoneWeigth: Yup.number()
                        .typeError('Você deve escrever um número')
                        .required('O peso da pedra é obrigatório'),
                    shape: Yup.string().required('O formato é obrigatório')
                }
            }

            if (discount) {
                validationObject.totalPrice = Yup.number()
                    .typeError('Você deve escrever um número')
                    .required('O preço é obrigatório')


                if (parseInt(formData.totalPrice) <= parseInt(formData.price)) {
                    return setFormError(
                        'O Valor do campo Preço com Desconto deve ser menor que o do campo Preço sem Desconto'
                    )
                }
            }

            formRef.current.setErrors({})
            const schema = Yup.object().shape(validationObject)
            await schema.validate(formData, {
                abortEarly: false
            })

            formData.visible = visible
            formData.spotlight = spotlight
            formData.discount = discount

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

                <Input name="description" label="Descrição" />
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
                                ? 'Preço com desconto em centavos'
                                : 'Preço em centavos'
                        }
                    />
                    {discount && (
                        <Input
                            name="totalPrice"
                            type="number"
                            label="Preço sem desconto em centavos"
                        />
                    )}
                </SideBySide>

                <SideBySide>
                    <CheckboxContainer>
                        <span>Visível:</span>
                        <input
                            name="visible"
                            type="checkbox"
                            checked={visible}
                            onChange={e => setVisible(e.target.checked)}
                        />
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <span>Destaque:</span>
                        <input
                            name="spotlight"
                            type="checkbox"
                            checked={spotlight}
                            onChange={e => setSpotlight(e.target.checked)}
                        />
                    </CheckboxContainer>
                </SideBySide>

                <CheckboxContainer>
                    <span>Desconto:</span>
                    <input
                        name="discount"
                        type="checkbox"
                        checked={discount}
                        onChange={e => setDiscount(e.target.checked)}
                    />
                </CheckboxContainer>

                <InlineButton type="submit">
                    {submitType === 'patch' ? 'Editar' : 'Próximo'}
                </InlineButton>
            </Form>

            {loading && (
                <div style={{ margin: '12rem auto', width: '120px' }}>
                    <ClipLoader color={'#00c2a8'} size={120} />
                </div>
            )}
        </>
    )
}

export default productForm
