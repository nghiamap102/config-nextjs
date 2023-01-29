import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const ProductService = {
    getProducts(): Promise<DataResponseModel<any>> {
        return axiosClient.get(API_ENDPOINT.product)
    },
    // getProductById: async (): Promise<DataResponseModel<any>> => {
    //     const res = await axiosClient.get('/product')
    //     return res.data
    // },
}

export default ProductService
