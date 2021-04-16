import { NextApiRequest, NextApiResponse } from 'next'
import axios from '../../../axios'
import cookie from 'cookie'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { data } = await axios.post('/users/login', req.body)

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', data[1], {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 2 * 60 * 60 * 1000,
                    path: '/',
                    sameSite:
                        process.env.NODE_ENV !== 'development' ? 'none' : 'lax'
                })
            )

            res.send(data[0])
        } catch (e) {
            res.status(400).send(e.response.data)
        }
    } else {
        res.status(405).json({ message: 'We only support POST' })
    }
}
