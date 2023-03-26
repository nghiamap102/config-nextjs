import { ProvinceModel } from "models/common"

export interface AuthInitState {
    address?: IAddress[]
    loading?: boolean
    error?: boolean
}

export interface IUser {
    _id?: string
    name?: string
    email?: string
    phone?: string
    role?: IRole
    sex?: string
    date_of_birth?: Date
    avatar?: any
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
    province?: ProvinceModel
    district?: ProvinceModel
    ward?: ProvinceModel
    no?: string
}


export type IRole = 'user' | 'admin' | 'shop'