import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const imageService = {
    uploadAvatar: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.IMAGE.UPLOAD, data)
    },
    previewImage: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.IMAGE.DOWNLOAD}/${data}`)
    },
}

export default imageService
