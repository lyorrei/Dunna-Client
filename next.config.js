const withImages = require('next-images')
module.exports = withImages({
    esModule: true,
    images: {
        domains: ['localhost']
    }
})

// module.exports = {
//     images: {
//         domains: ['localhost']
//     }
// }
