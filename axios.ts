import axios, { AxiosInstance } from 'axios'

interface Axios extends AxiosInstance {
    CancelToken?: any
    isCancel?: any
}

const instance: Axios = axios.create({
    withCredentials: true,

})

instance.defaults.baseURL = process.env.NEXT_BASE_URL
instance.defaults.headers.common.Accept = 'application/json'
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

export default instance
