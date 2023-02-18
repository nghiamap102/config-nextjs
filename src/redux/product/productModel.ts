export interface ProductInitState {
    list?: IProductItem[]
    category?: IProductCategory[]
    listSearch?: IProductItem[]
    detail?: IProductItem | null
    loading?: boolean
}

export interface IProductItem {
    _id?: string
    name?: string
    image?: string[]
    video?: any
    brand?: any
    decription?: string
    product_sample?: IProductSample[]
    product_type?: IProductType[]
    active?: boolean
}
export interface IProductSample {
    _id?: string
    product_type_id?: string[]
    image?: string
    unit_price?: number
    count_in_stock?: number
}

export interface IProductType {
    _id?: string
    product_id?: string
    title?: string
    cat_content?: string
    cat_group?: number
}

export interface IProductCategory {
    _id?: string
    name?: string
    image?: string
    category_parent_id?: string
}