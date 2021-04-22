import axios, { AxiosInstance } from 'axios'

interface Axios extends AxiosInstance {
    CancelToken?: any
    isCancel?: any
}

const instance: Axios = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV !== 'development' ? 'https://dunna.herokuapp.com/api' : `http://localhost:3000/api`
})

instance.defaults.headers.common.Accept = 'application/json'
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

export default instance
