var seeder = require('mongoose-seed')
require('dotenv').config()

// Connect to MongoDB via Mongoose
seeder.connect(process.env.DB_URL, function () {
    // Load Mongoose models
    seeder.loadModels(['server/src/models/product.js'])

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
        seeder.disconnect()
    })
})

// Data array containing seed data - documents organized by Model
var data = [
    {
        model: 'Product',
        documents: [
            {
                productType: '60773a36ba9eb06114866d3c',
                stock_id: 'Seed Test',
                name: 'Teste do produto',
                description: 'Teste do produto',
                price: 10000,
                discount: true,
                totalPrice: 20000,
                stone: '60723de47a20b66790d6013c',
                stoneWeigth: 2.0,
                diamondWeigth: 2.0,
                shape: '5fe9e44269fb8f3418b3acc4',
                metal: '6077511cffd5806d6cbbd4ae',
                sold: false,
                visible: true,
                notBuyable: false,
                spotlight: false,
                forMen: true,
                forWedding: false
            },
            {
                productType: '60773a36ba9eb06114866d3c',
                stock_id: 'Seed Test 2',
                name: 'Teste do produto',
                description: 'Teste do produto',
                price: 5000,
                discount: false,
                stone: '60723de47a20b66790d6013c',
                stoneWeigth: 2.0,
                diamondWeigth: 2.0,
                shape: '5fe9e44269fb8f3418b3acc4',
                metal: '6077511cffd5806d6cbbd4ae',
                sold: false,
                visible: true,
                notBuyable: false,
                spotlight: false,
                forMen: true,
                forWedding: false
            },
            {
                productType: '60773a36ba9eb06114866d3c',
                stock_id: 'Seed Test 3',
                name: 'Teste do produto',
                description: 'Teste do produto',
                price: 4000,
                discount: false,
                stone: '60723de47a20b66790d6013c',
                stoneWeigth: 2.0,
                diamondWeigth: 2.0,
                shape: '5fe9e44269fb8f3418b3acc4',
                metal: '6077511cffd5806d6cbbd4ae',
                sold: false,
                visible: true,
                notBuyable: false,
                spotlight: false,
                forMen: true,
                forWedding: false
            },
            {
                productType: '60773a36ba9eb06114866d3c',
                stock_id: 'Seed Test',
                name: 'Teste do produto',
                description: 'Teste do produto',
                price: 6000,
                discount: true,
                totalPrice: 9000,
                stone: '60723de47a20b66790d6013c',
                stoneWeigth: 2.0,
                diamondWeigth: 2.0,
                shape: '5fe9e44269fb8f3418b3acc4',
                metal: '6077511cffd5806d6cbbd4ae',
                sold: false,
                visible: true,
                notBuyable: false,
                spotlight: false,
                forMen: true,
                forWedding: false
            },
            {
                productType: '60773a36ba9eb06114866d3c',
                stock_id: 'Seed Test',
                name: 'Teste do produto',
                description: 'Teste do produto',
                price: 2000,
                discount: false,
                stone: '60723de47a20b66790d6013c',
                stoneWeigth: 2.0,
                diamondWeigth: 2.0,
                shape: '5fe9e44269fb8f3418b3acc4',
                metal: '6077511cffd5806d6cbbd4ae',
                sold: false,
                visible: true,
                notBuyable: false,
                spotlight: false,
                forMen: true,
                forWedding: false
            }
        ]
    }
]
