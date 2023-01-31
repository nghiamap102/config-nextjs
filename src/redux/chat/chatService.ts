import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const chatService = {
    sendMsg(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.CHAT.MESSAGE}`, data)
    },
    fetchCurrentChat(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.CHAT.CHANNEL}`, data)
    },

}

export default chatService
