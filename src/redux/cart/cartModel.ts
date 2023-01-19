import { IProductItem, ProductSample } from "@redux/product/productModel"

export interface CartInitState {
    list?: ICartItem[]
    wishList?: IWishListItem[]
    loading?: boolean
}

export interface IWishListItem {
    productId?: string
}

export interface ICartItem {
    _id?:string
    productId?: string
    type?: ProductSample
    quantity?: number
    products?: IProductItem[]
    active?: boolean
}
