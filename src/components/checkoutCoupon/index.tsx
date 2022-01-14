import React, { useEffect, useState } from 'react'
import axios from '../../../axios'

import { useCart } from '../../context/Cart'
import { CouponButton } from '../button'
import { Input } from '../input/style'

import { Coupon, CouponContainer } from './style'

import Alert, { Types } from '../alert'

const checkoutCoupon: React.FC = () => {
    const { cartPrice, setCoupon } = useCart()
    const [couponInput, setCouponInput] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const { cart } = useCart()

    const couponSubmit = async () => {
        try {
            if (couponInput === '') return

            const { data } = await axios.post('/coupon/check', {
                couponInput,
                cart,
                cartPrice
            })
            setError(null)
            setCouponInput(null)
            setSuccess(data.message)
            setCoupon(data.coupon)
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    return (
        <Coupon>
            {error && (
                <Alert close={() => setError(null)} type={Types.red}>
                    {error}
                </Alert>
            )}
            {success ? (
                <Alert type={Types.green}>{success}</Alert>
            ) : (
                <CouponContainer>
                    <Input
                        placeholder="Inserir cupom"
                        onChange={event => setCouponInput(event.target.value)}
                    />

                    <CouponButton onClick={couponSubmit}>Aplicar</CouponButton>
                </CouponContainer>
            )}
        </Coupon>
    )
}

export default checkoutCoupon
