export interface ProductInitState {
    list?: ProductData[]
    listSearch?: ProductData[]
    detail?: ProductData | null
    loading?: boolean
}

export interface ProductData {
    id?: string
    name?: string
    rate?: number
    sale?: string
    sample?: ProductSample[]
    tag?: string
    price?: number
    saleCount?: number
}
export interface ProductSample {
    color?: string
    imageSrc?: string
    size?: string
    
}