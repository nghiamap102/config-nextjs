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
    product_id?: string
    product?: IProductItem
    product_sample?: IProductSample
    sample_id?: string
    product_type?: IProductType[]
    quantity?: number
    active?: boolean
    category?: any[]
    description?: string
    checked?: boolean
}
