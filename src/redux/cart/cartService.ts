import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const cartService = {
    checkOut(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`/carts`, data)
    },
    addToCart(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.ORDER}`, data)
    },
    getCart(id: string): Promise<DataResponseModel<any>> {
        return axiosClient.get(`${API_ENDPOINT.CART}/${id}`)
    },
    updateCart(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.patch(API_ENDPOINT.CART, data)
    },
    deleteItem(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.delete(`${API_ENDPOINT.CART}/${data._id}`)
    }
}

export default cartService
