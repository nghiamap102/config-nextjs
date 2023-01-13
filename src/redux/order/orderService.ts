import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const OrderService = {
    createOrder: async (data: any): Promise<DataResponseModel<any>> => {
        const res = await axiosClient.post('/order')
        return res.data
    },
}

export default OrderService
