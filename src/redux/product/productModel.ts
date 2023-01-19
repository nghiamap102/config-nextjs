export interface ProductInitState {
    list?: IProductItem[]
    listSearch?: IProductItem[]
    detail?: IProductItem | null
    loading?: boolean
}

export interface IProductItem {
    id?: string
    name?: string
    image?: string[]
    video?: any
    tag?: string
    decription?: string
}
export interface ProductSample {
    countInStock?: number
    unit_price?: number
    image?: string
}

export interface IProductType {
    label?: string
    contentType?: string[]
}


export type ProductTag = 'favourite' | 'mall' | 'normal'