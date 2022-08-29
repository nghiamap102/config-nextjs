import { axiosClient } from '@common/index'
import { DataResponseModel } from 'models/commonModel'
import { CounterModel } from './counterModel'

const counterService = {
    get(data: CounterModel): Promise<DataResponseModel<CounterModel>> {
        return axiosClient.get(`/counter/${data.count}`)
    },
}
export default counterService
