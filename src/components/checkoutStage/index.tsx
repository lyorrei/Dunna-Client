import { useRouter } from 'next/router'
import React from 'react'
import { AiFillCreditCard, AiOutlineCheck } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { Stage, StageItem } from './style'

interface Props {
    stage: number
}

const checkoutStage: React.FC<Props> = ({ stage }) => {
    const Router = useRouter()

    return (
        <Stage>
            <StageItem isActive={stage === 0}>
                <GoLocation />
                <p>Endereço</p>
            </StageItem>
            <StageItem isActive={stage === 1}>
                <AiFillCreditCard />
                <p>Pagamento</p>
            </StageItem>
            {Router.query.method === 'stripe' && (
                <StageItem isActive={stage === 2}>
                    <AiOutlineCheck />
                    <p>Confirmação</p>
                </StageItem>
            )}
        </Stage>
    )
}

export default checkoutStage
