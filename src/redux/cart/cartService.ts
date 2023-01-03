import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const cartService = {
    checkOut(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`/carts/add`, data)
    },
}

export default cartService
