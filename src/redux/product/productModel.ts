export interface ProductInitState {
    list? : ProductData[]
    listSearch? : ProductData[]
    detail?: ProductData | null
    loading?: boolean
}

export interface ProductData {
    id?:string
    name?: string
    rate?: number
    sale?: string
    listColor?: string[]
    tag?: string
    imageSrc? : string[]
    price?: number
}