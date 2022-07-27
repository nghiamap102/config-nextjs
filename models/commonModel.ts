export interface PageginationModel {
    limit?: number
    page?: number
    pages?: number
    skip?: number
    total?: number
}
export interface ListResponseModel<T> {
    message?: string
    error?: number
    data?: T[]
    pagegination?: PageginationModel
}

export interface DataResponseModel<T> {
    message?: string
    error?: number
    data?: T
}
