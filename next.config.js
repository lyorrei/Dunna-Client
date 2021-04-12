const withImages = require('next-images')
module.exports = withImages({
    esModule: true,
    inlineImageLimit: false
    // images: {
    //     domains: ['localhost', 'https://dunna.herokuapp.com']
    // }
})

// module.exports = {
//     images: {
//         domains: ['localhost']
//     }
// }
