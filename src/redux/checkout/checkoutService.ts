import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const checkoutService = {
    createCheckout(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.CHECKOUT}`, data)
    },
    getCheckout(data: string): Promise<DataResponseModel<any>> {
        return axiosClient.get(`${API_ENDPOINT.CHECKOUT}/${data}`)
    },
    payment(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.ORDER}`, data)
    },
}

export default checkoutService
