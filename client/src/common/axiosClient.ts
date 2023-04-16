import { createStandaloneToast } from '@chakra-ui/react'
import authService from '@redux/auth/authService'
import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { getSession } from 'next-auth/react'
const { toast } = createStandaloneToast()

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

export const axiosClient = axios.create({
    baseURL: process.env.API_URL_BE,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const session = await getSession()
        if (session?.user) {
            if (config.headers && config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${
                    Cookies.get('access_token') || session?.user?.access_token
                }`
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

axiosClient.interceptors.response.use(
    async response => {
        if (response.data.message) {
            toast({ title: response.data.message, id: response.data.message })
        }
        return response
    },
    async error => {
        // Handle errors here
        if (error.response?.status) {
            const session = await getSession()
            if (error.response.status === 401) {
                const res = await authService.refreshToken({
                    refresh_token:
                        Cookies.get('refresh_token') ||
                        session?.user.refresh_token,
                })
                if (res.data) {
                    Cookies.set('access_token', res.data.access_token)
                    Cookies.set('refresh_token', res.data.refresh_token)
                }
            }

            switch (error.response.status) {
                case 401:
                    console.log(error)
                    toast({ title: error.response?.status })
                    // Handle Unauthenticated here
                    break
                case 403:
                    // Handle Unauthorized here
                    toast({ title: error.response?.status })
                    break
                // ... And so on
            }
        }
        return error
    },
)
