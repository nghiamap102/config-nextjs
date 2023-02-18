import { useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import CustomToast from "@components/Toast";

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

const AxiosErrorHandler = ({ children }) => {
    const toast = CustomToast()
    useEffect(() => {
        // Request interceptor
        const requestInterceptor = axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
            return config
        }, (error) => {
            return Promise.reject(error)
        })

        // Response interceptor
        const responseInterceptor = axiosClient.interceptors.response.use((response) => {
            // Handle errors here
            if (response.data) {
                return response.data;
            } else {
                return response
            }
        }, (error) => {
            // Handle errors here
            if (error.response?.status) {
                switch (error.response.status) {
                    case 401:
                        console.log(error)
                        toast({ title: error.response?.status })
                        // Handle Unauthenticated here
                        break;
                    case 403:
                        // Handle Unauthorized here
                        break;
                    // ... And so on
                }
            }

            return error;
        });

        return () => {
            // Remove handlers here
            axiosClient.interceptors.request.eject(requestInterceptor);
            axiosClient.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return children
};


export default AxiosErrorHandler;