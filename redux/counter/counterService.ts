import { DataResponseModel } from 'src/models/commonModel'
import axiosClient from '../../helpers/axiosClient'
import { CounterModel } from './counterModel'

const counterService = {
    get(data: CounterModel): Promise<DataResponseModel<CounterModel>> {
        return axiosClient.get(`/counter/${data.count}`)
    },
}
export default counterService
