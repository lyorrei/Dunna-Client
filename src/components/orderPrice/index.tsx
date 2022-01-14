import React from 'react'
import { NoDiscountPrice, OrderPriceContainer } from './style'

interface Props {
    discount?: boolean
    noDiscountPrice?: number
    discountPrice: number
    marginBottom?: boolean
    primaryColor?: boolean
    next?: boolean
}

const orderPrice: React.FC<Props> = ({
    discount,
    noDiscountPrice,
    discountPrice,
    marginBottom,
    primaryColor,
    next
}) => {
    return (
        <OrderPriceContainer
            next={next}
            primaryColor={primaryColor}
            marginBottom={marginBottom}
        >
            <span>Total:</span>
            <div>
                {discount && noDiscountPrice && (
                    <NoDiscountPrice>
                        R$ {(noDiscountPrice / 100).toFixed(2)}
                    </NoDiscountPrice>
                )}
                <span>R$ {(discountPrice / 100).toFixed(2)}</span>
            </div>
        </OrderPriceContainer>
    )
}

export default orderPrice
