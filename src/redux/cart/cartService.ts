import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const cartService = {
    checkOut(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`/carts`, data)
    },
    addToCart(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.cart}`, data)
    },
    getCart(): Promise<DataResponseModel<any>> {
        return axiosClient.get(`/cart`)
    },
    getCartDetails(): Promise<DataResponseModel<any>> {
        return axiosClient.get(API_ENDPOINT.cartDetails)
    },
    updateCart(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.patch(API_ENDPOINT.cart, data)
    },
    deleteItem(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.delete(`${API_ENDPOINT.cart}/${data._id}`)
    }
}

export default cartService
