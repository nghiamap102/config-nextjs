import { ProvinceModel } from "models/common"

export interface AuthInitState {
    user?: IUser
    address?: IAddress[]
    error?: boolean
    loading?: boolean
    updateSuccess?: boolean
}

export interface IUser {
    _id?: string
    name?: string
    email?: string
    phone?: string
    role?: IRole
    sex?: string
    date_of_birth?: Date
}

export interface IAddress {
    _id?: string
    name?: string
    phone?: string
    user_id?: string
    address_name?: string
    location?: ILocation
    default?: boolean
}
export interface ILocation {
    city?: ProvinceModel
    district?: ProvinceModel
    ward?: ProvinceModel
    no?: string
}


export type IRole = 'user' | 'admin' | 'shop'