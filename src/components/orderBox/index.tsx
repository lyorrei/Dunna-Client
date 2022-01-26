import React from 'react'
import Moment from 'react-moment'

import { Order } from '../../pages/checkout/success/[orderId]'
import { CartItemContainer } from '../checkoutCart/style'

import OrderAddress from '../orderAddress'
import CartItem from '../cartItem'

import {
    OrderBox,
    Coupon,
    ItensContainer,
    OrderHeader,
    OrderBody,
    DateParagraph,
    UntilDate,
    Total
} from './style'

interface Props {
    order: Order
}

const orderBox: React.FC<Props> = ({ order }) => {
    return (
        <OrderBox>
            <OrderHeader>
                <DateParagraph>
                    <span>Data do pedido</span>{' '}
                    <Moment local={true} format="DD/MM/YYYY">
                        {order.createdAt}
                    </Moment>
                </DateParagraph>
                <Total coupon={order.coupon ? true : false}>
                    <span>Total</span> R$ {(order.totalAmount / 100).toFixed(2)}
                </Total>

                {order.coupon && (
                    <Coupon>
                        <span>Cupom</span> R${' '}
                        {(order.coupon.value / 100).toFixed(2)}
                    </Coupon>
                )}
                <UntilDate>
                    <span>{order.shipping.status}</span>
                </UntilDate>
            </OrderHeader>
            <OrderBody>
                <ItensContainer>
                    <CartItemContainer>
                        {order.orderItems.map(({ product: item }) => (
                            <CartItem product={item} />
                        ))}
                    </CartItemContainer>
                </ItensContainer>
                <OrderAddress order={order} />
            </OrderBody>
        </OrderBox>
    )
}

export default orderBox
