import { ProductData } from "redux/product/productModel"

export interface CartInitState {
    productList?: ProductData[]
    loading?: boolean
}

