import { IProductItem, IProductSample, IProductType } from "@redux/product/productModel"

export interface CheckoutInitState {
    list?: ICheckout
    loading?: boolean
    success?: boolean
}


export interface ICheckout {
    _id?: string
    items?: ResCheckout[]
}

export interface DataCheckout {
    sample_id?: string
    product_id?: string
}


export interface ResCheckout {
    product_sample?: IProductSample & { product_type?: IProductType[] }
    product?: IProductItem
    quantity?: number
    description?: string
}