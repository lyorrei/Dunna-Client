const withImages = require('next-images')
module.exports = withImages({
    esModule: true,
    images: {
        domains: ['localhost', 'https://dunna.herokuapp.com']
    }
})

// module.exports = {
//     images: {
//         domains: ['localhost']
//     }
// }
