export interface ProductInitState {
    list?: IProductItem[]
    listSearch?: IProductItem[]
    detail?: IProductItem | null
    loading?: boolean
}

export interface IProductItem {
    _id?: string
    name?: string
    image?: string[]
    video?: any
    tag?: string
    product_type?: IProductType
    decription?: string
    product_sample?:any[]
}

export interface IProductType {
    category?: IProductTypeItem[]
}

export interface IProductTypeItem {
    title?: string
    cat_content?: string[]
}


export type ProductTag = 'favourite' | 'mall' | 'normal'