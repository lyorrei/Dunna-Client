const withImages = require('next-images')
module.exports = withImages({
    esModule: true,
    inlineImageLimit: false,
    assetPrefix: 'https://dunna-server.herokuapp.com',
    // images: {
    //     domains: ['localhost', 'https://dunna.herokuapp.com']
    // }
})

// module.exports = {
//     images: {
//         domains: ['localhost']
//     }
// }
