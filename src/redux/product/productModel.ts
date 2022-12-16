export interface ProductInitState {
    list?: IProductItem[]
    listSearch?: IProductItem[]
    detail?: IProductItem | null
    loading?: boolean
}

export interface IProductItem {
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
    type?: string
    anotherType?: string
}