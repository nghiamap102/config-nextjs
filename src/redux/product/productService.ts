import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const ProductService = {
    getProduct(): Promise<DataResponseModel<any>> {
        return axiosClient.get(API_ENDPOINT.PRODUCT.INDEX)
    },
    getProductCategory(): Promise<DataResponseModel<any>> {
        return axiosClient.get(API_ENDPOINT.CATEGORY)
    },
    getProductByCategory(catId: string): Promise<DataResponseModel<any>> {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.CATEGORY}/${catId}`)
    },

    // getProductById: async (): Promise<DataResponseModel<any>> => {
    //     const res = await axiosClient.get('/product')
    //     return res.data
    // },
}

export default ProductService
