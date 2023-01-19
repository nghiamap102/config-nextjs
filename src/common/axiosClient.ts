import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.BE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

const parserData = (res: any) => {
    if (!res.data && res.products) {
        return {
            ...res,
            data: res.products,
        }
    } else if (!res.data) {
        return {
            data: res,
        }
    }
    return res
}

// Interceptors
axiosClient.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        return parserData(response.data)
    },
    function (error) {
        return Promise.reject(error)
    },
)

export { axiosClient }
