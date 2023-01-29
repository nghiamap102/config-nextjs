import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const checkoutService = {
    checkout(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.checkout}`, data)
    },
}

export default checkoutService
