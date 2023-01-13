import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const UserService = {
    updateIn4: async (): Promise<DataResponseModel<any>> => {
        const res = await axiosClient.get('/user')
        return res.data
    },
}

export default UserService
