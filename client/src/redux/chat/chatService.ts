import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const chatService = {
    sendMsg: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(`${API_ENDPOINT.MESSAGE.CREATE}`, data).then(res => res.data)
    },
    fetchCurrentChat: async (data: any, query?:any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.CHAT.CURRENT_CHAT}/${data}?${query}`).then(res => res.data)
    },
    fetchAllChats: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.CHAT.ALL_CHAT}/${data}`).then(res => res.data)
    },

}

export default chatService
