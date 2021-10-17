import React, { useEffect, useRef, useState } from 'react'

import { Form, RangeSliderContainer } from './style'

import Select from '../select'

import { StonesAndShapes } from '../../pages/shop/[type]'
import { FormHandles } from '@unform/core'
import InputRange, { Range } from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import { motion } from 'framer-motion'

import { item } from '../../pages/shop'

interface Props {
    stones: StonesAndShapes[]
    shapes: StonesAndShapes[]
    productTypes: StonesAndShapes[]
    formRef: React.MutableRefObject<FormHandles>
    handleFilterChange: (value?: number | Range) => void
    priceValue: { min: number; max: number }
    changeHandler: (value?: number | Range) => void
}

const filterProducts: React.FC<Props> = ({
    stones,
    shapes,
    formRef,
    handleFilterChange,
    priceValue,
    changeHandler,
    productTypes
}) => {
    const [productTypeOptions, setProductTypeOptions] = useState(null)
    const [stonesOptions, setStoneOptions] = useState(null)
    const [shapesOptions, setShapeOptions] = useState(null)

    const optionsToArray = (options: StonesAndShapes[]) => {
        return options.map(option => ({
            value: option._id,
            label: option.name
        }))
    }

    useEffect(() => {
        const stonesArray = optionsToArray(stones)
        setStoneOptions(stonesArray)

        const shapesArray = optionsToArray(shapes)
        setShapeOptions(shapesArray)

        const productTypesArray = optionsToArray(productTypes)
        setProductTypeOptions(productTypesArray)
    }, [stones, shapes])

    return (
        <Form ref={formRef} onSubmit={() => {}}>
            {/* <motion.div variants={item}>
                <Select
                    isMultiple
                    name="productTypes"
                    options={productTypeOptions}
                    placeholder="Escolha um tipo"
                    onChange={() => handleFilterChange()}
                />
            </motion.div> */}
            <motion.div variants={item}>
                <Select
                    isMultiple
                    name="stones"
                    options={stonesOptions}
                    placeholder="Escolha uma pedra"
                    onChange={() => handleFilterChange()}
                />
            </motion.div>
            <motion.div variants={item}>
                <Select
                    isMultiple
                    name="shapes"
                    options={shapesOptions}
                    placeholder="Escolha um formato"
                    onChange={() => handleFilterChange()}
                />
            </motion.div>
            <motion.div variants={item}>
                <RangeSliderContainer color="red">
                    <h3>Preço:</h3>
                    <InputRange
                        maxValue={60000}
                        minValue={0}
                        value={priceValue}
                        onChange={changeHandler}
                        onChangeComplete={value => handleFilterChange(value)}
                        step={5000}
                        formatLabel={(value, type) => {
                            if (type === 'min' || type === 'max') {
                                return `${value}`
                            } else {
                                return `R$ ${value}`
                            }
                        }}
                    />
                </RangeSliderContainer>
            </motion.div>
        </Form>
    )
}

export default filterProducts
