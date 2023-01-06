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
    sale?: number
    sample?: ProductSample[]
    tag?: string
    price?: number
    quatity_remain: number
    saleCount?: number
    decription?: string
}
export interface ProductSample {
    color?: string
    imageSrc?: string
    size?: string
    anotherType?: string
    countInStock?: number
}

export type ProductTag = 'favourite' | 'mall' | 'normal'