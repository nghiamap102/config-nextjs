import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.API_URL_BE,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getAccessToken = () => {
    let accessToken: string | null = ''
    let refreshToken: string | null = ''
    if (typeof window !== 'undefined') {
        accessToken = localStorage?.getItem('access_token')
        refreshToken = localStorage?.getItem('refresh_token')
    }
    //   return `Bearer accessToken`;
    return { refreshToken, accessToken }
}



export const getCustomerId = () => {
    const userId = localStorage?.getItem('userId')
    //   return `Bearer accessToken`;
    return userId
}

// Interceptors
axiosClient.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        const token = getAccessToken()
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // } else {

        // }
        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        if (response && response.data) {
            return response.data
        }
        return response
    },
    async (error) => {
        if (error.response?.status === 401) {
            // //   localStorage.clear();
            // const response = { code: 'success', data: [{ value: '', data: { use_id: '' } }] }
            // if (response.code === 'success') {
            //   const { data } = response
            //   if (data && data[0]) {
            //     localStorage.setItem('accessToken', data[0].value)
            //     localStorage.setItem('userId', data[0]?.data?.use_id)
            //   }
            // }
        }
        if (error.response?.status === 403) {
            // const sessionToken: any = await getSessionToken()
            // sessionStorage.setItem('sessionToken', sessionToken)
        }
        throw error
    },
)

export { axiosClient }
