import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/commonModel'

const ProductService = {
    fetchProduct: async (): Promise<DataResponseModel<any>> => {
        const res = await axiosClient.get('/api/product')
        return res.data
    },
}

export default ProductService
