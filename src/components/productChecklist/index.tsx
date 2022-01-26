import React from 'react'

import { FaShapes, FaWeight } from 'react-icons/fa'
import { GiMetalBar, GiStoneBlock, GiStoneSphere } from 'react-icons/gi'
import { RiVipDiamondLine } from 'react-icons/ri'

import { ProductInterface } from '../product'

import { CheckList } from './style'

interface Props {
    product: ProductInterface
}

const productChecklist: React.FC<Props> = ({product}) => {
    return (
        <CheckList>
            <li>
                <GiStoneSphere />
                <span>Tipo: {product.productType.name}</span>
            </li>
            <li>
                <GiStoneBlock />
                <span>Pedra: {product.stone.name}</span>
            </li>

            {product.stoneWeigth && product.stoneWeigth > 0 ? (
                <li>
                    <FaWeight />
                    <span>Peso da Pedra: {product.stoneWeigth} ct</span>
                </li>
            ) : null}

            {product.diamondWeigth && product.diamondWeigth > 0 ? (
                <li>
                    <RiVipDiamondLine />
                    <span>Peso do diamante: {product.diamondWeigth} ct</span>
                </li>
            ) : null}

            <li>
                <FaShapes />
                <span>Formato: {product.shape.name}</span>
            </li>
            {product.metal && (
                <li>
                    <GiMetalBar />
                    <span>Metal: {product.metal.name}</span>
                </li>
            )}
            {product.type && product.type.name === 'Anel' && (
                <li>
                    <GiMetalBar />
                    <span>Tamanho: Ajustável</span>
                </li>
            )}
        </CheckList>
    )
}

export default productChecklist
