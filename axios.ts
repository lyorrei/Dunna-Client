import axios, { AxiosInstance } from 'axios'

interface Axios extends AxiosInstance {
    CancelToken?: any
    isCancel?: any
}

const instance: Axios = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV !== 'development' ? 'https://dunna.herokuapp.com/api' : `http://localhost:3000/api`
})

// instance.defaults.baseURL =
//     process.env.NODE_ENV !== 'development'
//         ? 'https://dunna-server.herokuapp.com'
//         : 'http://localhost:3001'
// instance.defaults.baseURL = process.env.APP_URL + '/api'
// instance.defaults.baseURL = 'http://localhost:3001'
// instance.defaults.baseURL = 'https://dunna-server.herokuapp.com'
instance.defaults.headers.common.Accept = 'application/json'
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

export default instance
