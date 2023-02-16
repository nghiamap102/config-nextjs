export interface OrderInitState {
    list?: IOrder[]
    loading?: boolean
    success?: boolean
    error?: boolean
}

export interface IOrder {
    abc?: string
}

export interface DataOrder {
    payment_method?: string
    status?: string
    coin?: number
    order?: DataOrderItem[]
}

export interface DataOrderItem {
    quantity?: number
    sample_id?: string
    description?: string
    total?: number
}