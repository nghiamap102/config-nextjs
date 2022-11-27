import { ProductData } from "redux/product/productModel"

export interface CartInitState {
    productList?: ProductData[]
    wishList?: ProductData[]
    loading?: boolean
}

