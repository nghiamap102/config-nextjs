import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const authService = {
    login: (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.AUTH.LOGIN, data).then(res => res.data)
    },
    logout: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.AUTH.LOGOUT ,data).then(res => res.data)
    },
    register: async (): Promise<DataResponseModel<any>> => {
        return axiosClient.get(API_ENDPOINT.AUTH.REGISTER).then(res => res.data)
    },
    verify: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.AUTH.VERIFY, data).then(res => res.data)
    },
    updateUser: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.patch(API_ENDPOINT.AUTH.USER, data).then(res => res.data)
    },
    getUserById: async (id: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.AUTH.USER}/${id}`).then(res => res.data)
    },
    refreshToken: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(`${API_ENDPOINT.AUTH.REFRESH_TOKEN}`, data).then(res => res.data)
    },
    // address
    fetchAddress: async (id: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.AUTH.ADDRESS}/${id}`).then(res => res.data)
    },
    createAddress: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.AUTH.ADDRESS, data).then(res => res.data)
    },
    updateAddress: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.patch(`${API_ENDPOINT.AUTH.ADDRESS}/${data._id}`, data).then(res => res.data)
    },
    changeAddressDefault: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.patch(`${API_ENDPOINT.AUTH.ADDRESS_DEFAULT}/${data._id}`, data).then(res => res.data)
    },
}

export default authService
