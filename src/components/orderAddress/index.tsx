import React from 'react'
import { Order } from '../../pages/checkout/success/[orderId]'
import { AddressDetails } from './style'

interface Props {
    order: Order
    additional?: boolean
    status?: boolean
}

const orderAddress: React.FC<Props> = ({ order, additional, status }) => {
    return (
        <AddressDetails>
            <p>
                <span>Estado:</span> {order.shipping.order_address.state}
            </p>
            <p>
                <span>Cidade:</span> {order.shipping.order_address.city}
            </p>
            <p>
                <span>Rua:</span> {order.shipping.order_address.street}{' '}
                {order.shipping.order_address.number}
            </p>
            {status && (
                <p>
                    <span>Status:</span> {order.shipping.status}
                </p>
            )}

            <p>
                <span>CEP:</span> {order.shipping.order_address.zip}
            </p>
            {additional && order.shipping.order_address.additional_info && (
                <p style={{ gridTemplateColumns: '7rem max-content' }}>
                    <span>Informações adicionais:</span>
                    {order.shipping.order_address.additional_info}
                </p>
            )}
            <p>
                <span>Frete:</span> R$ {order.shipping.ship_charge.toFixed(2)}
            </p>
            <p>
                <span>Telefone:</span> {order.shipping.order_address.phone}
            </p>
        </AddressDetails>
    )
}

export default orderAddress
