import { IUser } from "@redux/auth/authModel"

export interface ProductInitState {
    list?: IProductItem[]
    category?: IProductCategoryLabel[]
    listSearch?: IProductItem[]
    detail?: IProductItem | null
    loading?: boolean
    comment?: IComment[]
    commentRating?: ICommentRating
    count?: number
    facet?: IFacet[]
    newProduct?: IProductItem[]
}

export interface IProductItem {
    _id?: string
    name?: string
    image?: string[]
    video?: any
    brand?: any
    decription?: string
    product_sample?: IProductSample[]
    product_type?: IProductType[]
    active?: boolean
    sold?: number
    rating?: {
        average?: number
        count?: number
    }
}
export interface IProductSample {
    _id?: string
    product_type_id?: string[]
    image?: string
    unit_price?: number
    count_in_stock?: number
}

export interface IProductType {
    _id?: string
    product_id?: string
    title?: string
    cat_content?: string
    cat_group?: number
}

export interface IProductCategory {
    _id?: string
    product_id?: string
    title?: string
    cat_content?: string
    cat_group?: number
}

export interface IProductCategoryLabel {
    name?: string
    image?: string
    category_parent_id?: string
}
export interface IComment {
    _id?: string
    user?: IUser
    product_id?: string
    video?: string
    star?: number
    image?: string[]
    category?: IProductCategory[]
    content?: string
    createdAt?: string
}

export interface ICommentRating {
    star_avg?: {
        _id?: string
        value?: number
    }
    filter?: {
        all?: number
        star_1?: number
        star_2?: number
        star_3?: number
        star_4?: number
        star_5?: number
        with_video?: number
        with_comment?: number
    }
}

export interface IFacet {
    _id?: string
    detail?: IProductCategoryLabel
    count?: number
}