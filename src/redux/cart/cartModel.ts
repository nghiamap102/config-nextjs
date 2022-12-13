import { ProductSample } from './../product/productModel';
import { ProductData } from "redux/product/productModel"

export interface CartInitState {
    list?: CartData[]
    wishList?: ProductData[]
    loading?: boolean
}
export type CartData = {
    created_at: number
    modified_at: number
} & ICartItem
export interface ICartItem {
    productId: string
    quantity: number
    type: ProductSample
}