const withImages = require('next-images')
module.exports = withImages({
    esModule: true,
    inlineImageLimit: false,
    images: {
        domains: ['localhost', 'https://dunna.herokuapp.com', 'https://www.dunnajoalheria.com.br', 'dunna-upload.s3.amazonaws.com']
    }
})

// module.exports = {
//     images: {
//         domains: ['localhost']
//     }
// }
