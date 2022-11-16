export interface ProductInitState {
    list? : ProductData[]
    listSearch? : ProductData[]
    detail?: ProductData
    loading?: boolean
}

export interface ProductData {
    name: string
}