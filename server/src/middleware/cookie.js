const cookie = (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    next()
}

module.exports = cookie
