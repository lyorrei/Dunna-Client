const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(async () => {
        await require('./db/mongoose')()
        const server = express()

        server.use(express.json())

        require('dotenv').config()

        const cors = require('cors')
        server.use(
            cors({
                credentials: true,
                origin: process.env.CLIENT_URL
            })
        )

        const path = require('path')
        server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        )

        var cookieParser = require('cookie-parser')
        server.use(cookieParser())

        const userRoutes = require('./routers/user')
        server.use(userRoutes)

        const productRoutes = require('./routers/product')
        server.use(productRoutes)

        const productImageRoutes = require('./routers/productImage')
        server.use(productImageRoutes)

        const stoneRoutes = require('./routers/stone')
        server.use(stoneRoutes)

        const shapeRoutes = require('./routers/shape')
        server.use(shapeRoutes)

        const productTypeRoutes = require('./routers/productType')
        server.use(productTypeRoutes)

        const typeRoutes = require('./routers/type')
        server.use(typeRoutes)

        const metalRoutes = require('./routers/metal')
        server.use(metalRoutes)

        const orderRoutes = require('./routers/order')
        server.use(orderRoutes)

        const orderItemRoutes = require('./routers/orderItem')
        server.use(orderItemRoutes)

        const shippingRoutes = require('./routers/shipping')
        server.use(shippingRoutes)

        const addressRoutes = require('./routers/address')
        server.use(addressRoutes)

        const orderAddressRoutes = require('./routers/orderAddress')
        server.use(orderAddressRoutes)

        const chargeRoutes = require('./routers/charge')
        server.use(chargeRoutes)

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(process.env.PORT || 3000, () => {
            console.log('server runnning')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
