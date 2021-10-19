import react from 'react'
import axios from '../../../axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Router from 'next/router'

interface MyProps {
    cart: any
    setIsCompleted(boolean: boolean): void
    orderId: string
    setOrderId(id: string): void
    total: number
    selectedAddress: string
}

export default class Example extends react.Component<MyProps> {
    render() {
        return (
            <PayPalButton
                createOrder={async (data, actions) => {
                    try {
                        const requestData = {
                            cart: this.props.cart,
                            amount: this.props.total,
                            addressId: this.props.selectedAddress
                        }
                        const { data: response } = await axios.post(
                            '/paypal/create',
                            requestData
                        )
                        this.props.setOrderId(response.orderId)
                        return response.orderId
                    } catch (e) {
                        console.log(e)
                    }
                }}
                onApprove={async data => {
                    const requestData = {
                        cart: this.props.cart,
                        amount: this.props.total,
                        addressId: this.props.selectedAddress,
                        orderId: data.orderID
                    }

                    try {
                        const { data } = await axios.post(
                            '/paypal/capture',
                            requestData
                        )
                        this.props.setIsCompleted(true)
                        Router.replace(
                            '/checkout/success/' + data.createdOrderId
                        )
                    } catch (e) {
                        console.log(e)
                    }
                }}
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                    currency: 'BRL'
                    // intent: 'capture'
                }}
            />
        )
    }
}
