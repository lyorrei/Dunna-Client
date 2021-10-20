const express = require('express')
const router = express.Router()
const axios = require('axios').default

const { auth: authMiddleware } = require('../middleware/auth')

// Get Access Token
router.get('/api/rdtoken', async (req, res) => {
    try {
        const payload = {
            client_id: process.env.RD_CLIENT_ID,
            client_secret: process.env.RD_CLIENT_SECRET,
            refresh_token: process.env.RD_REFRESH_TOKEN
        }

        if (!req.cookies.access_token) {
            const { data } = await axios.post(
                'https://api.rd.services/auth/token',
                payload
            )

            res.cookie('rd_access_token', data.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: data.expires_in * 1000, // 1 Day
                path: '/',
                sameSite: 'lax'
            })
        }

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Send conversion event when cart changes
router.get('/api/rdcart', authMiddleware, async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + req.cookies.rd_access_token
                }
            }

            const conversionData = JSON.stringify({
                event_type: 'CONVERSION',
                event_family: 'CDP',
                payload: {
                    conversion_identifier: 'Carrinho',
                    name: req.user.firstName + ' ' + req.user.lastName,
                    email: req.user.email
                }
            })

            await axios.post(
                'https://api.rd.services/platform/events',
                conversionData,
                options
            )
        }

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Send conversion event when enter checkout page
router.get('/api/rdcheckout', authMiddleware, async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + req.cookies.rd_access_token
                }
            }

            const conversionData = JSON.stringify({
                event_type: 'CONVERSION',
                event_family: 'CDP',
                payload: {
                    conversion_identifier: 'Checkout',
                    name: req.user.firstName + ' ' + req.user.lastName,
                    email: req.user.email
                }
            })

            await axios.post(
                'https://api.rd.services/platform/events',
                conversionData,
                options
            )

            const oportunityData = JSON.stringify({
                event_type: 'OPPORTUNITY',
                event_family: 'CDP',
                payload: {
                    funnel_name: 'default',
                    email: req.user.email
                }
            })

            await axios.post(
                'https://api.rd.services/platform/events',
                oportunityData,
                options
            )
        }

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
