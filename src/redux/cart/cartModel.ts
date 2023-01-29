import { IProductItem } from "@redux/product/productModel"

export interface CartInitState {
    list?: ICartItem[]
    wishList?: IWishListItem[]
    loading?: boolean
    error?: boolean
}

export interface IWishListItem {
    product_id?: string
}

export interface ICartItem {
    _id?: string
    product_id?: string
    quantity?: number
    product?: IProductItem
    product_sample?: any[]
    product_type?:any
    sample_id?: string
    category?: ICategory[]
    active?: boolean
    unit_price?:number
}

export interface ICategory {
    title?: string
    cat_content?: string
}