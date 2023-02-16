import { IProductItem, IProductSample, IProductType } from "@redux/product/productModel"

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
    product?: IProductItem
    product_sample?: IProductSample
    product_type?: IProductType[]
    quantity?: number
    description?: string
    checked?: boolean 
}

export interface ICategory {
    _id?: string
    title?: string
    cat_content?: string
    cat_group?: number
}