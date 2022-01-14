import react from 'react'
import axios from '../../../axios'
import { PayPalButton } from 'react-paypal-button-v2'
import Router from 'next/router'
import { Coupon } from '../../pages/coupons'

interface MyProps {
    cart: any
    setIsCompleted(boolean: boolean): void
    total: number
    selectedAddress: string
    couponName?: string
    setCoupon(coupon: Coupon): void
}

export default class Example extends react.Component<MyProps> {
    render() {
        return (
            <PayPalButton
                createOrder={async (data, actions) => {
                    try {
                        const requestData: any = {
                            cart: this.props.cart,
                            amount: this.props.total,
                            addressId: this.props.selectedAddress
                        }

                        if (this.props.couponName) {
                            requestData.couponName = this.props.couponName
                        }

                        const { data: response } = await axios.post(
                            '/paypal/create',
                            requestData
                        )
                        return response.orderId
                    } catch (e) {
                        console.log(e)
                    }
                }}
                onApprove={async data => {
                    const requestData: any = {
                        cart: this.props.cart,
                        amount: this.props.total,
                        addressId: this.props.selectedAddress,
                        orderId: data.orderID
                    }

                    if (this.props.couponName) {
                        requestData.couponName = this.props.couponName
                    }

                    try {
                        const { data } = await axios.post(
                            '/paypal/capture',
                            requestData
                        )
                        this.props.setIsCompleted(true)
                        this.props.setCoupon(null)

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
