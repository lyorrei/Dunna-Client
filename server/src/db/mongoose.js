const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('MongoDB connection SUCCESS')
    } catch (e) {
        console.error('MongoDB connection FAIL')
        process.exit(1)
    }
}

module.exports = connectDB;
