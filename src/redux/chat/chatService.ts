import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const chatService = {
    sendMsg(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.post(`${API_ENDPOINT.MESSAGE.CREATE}`, data)
    },
    fetchCurrentChat(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.get(`${API_ENDPOINT.CHAT.CURRENT_CHAT}/${data}`)
    },
    fetchAllChats(data: any): Promise<DataResponseModel<any>> {
        return axiosClient.get(`${API_ENDPOINT.CHAT.ALL_CHAT}/${data}`)
    },

}

export default chatService
