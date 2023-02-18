import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const authService = {
    login: (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.AUTH.LOGIN, data)
    },
    logout: async (): Promise<DataResponseModel<any>> => {
        return axiosClient.get(API_ENDPOINT.AUTH.LOGOUT)
    },
    register: async (): Promise<DataResponseModel<any>> => {
        return axiosClient.get(API_ENDPOINT.AUTH.REGISTER)
    },
    verify: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.AUTH.VERIFY, data)
    },
    updateUser: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.patch(API_ENDPOINT.AUTH.USER, data)
    },
    getUserById: async (id: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.AUTH.USER}/${id}`)
    },
    // address
    fetchAddress: async (id: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.AUTH.ADDRESS}/${id}`)
    },
    createAddress: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(`${API_ENDPOINT.AUTH.ADDRESS}`, data)
    },
    updateAddress: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.patch(`${API_ENDPOINT.AUTH.ADDRESS}/${data._id}`, data)
    },
    changeAddressDefault: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.patch(`${API_ENDPOINT.AUTH.ADDRESS_DEFAULT}/${data._id}`,data)
    },
}

export default authService
