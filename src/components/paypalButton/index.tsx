import react from 'react'
import axios from '../../../axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { GiConsoleController } from 'react-icons/gi'
import { Console } from 'console'

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
                onApprove={async (data, txt) => {
                    this.props.setIsCompleted(true)
                }}
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                    currency: 'BRL',
                    intent: 'capture'
                }}
            />
        )
    }
}
