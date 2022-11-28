import { ProductData } from "redux/product/productModel"

export interface CartInitState {
    list?: CartData[]
    wishList?: ProductData[]
    loading?: boolean
}


export interface CartData {
    product: ProductData
    count: number
}
