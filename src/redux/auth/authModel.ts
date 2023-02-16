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
}

export interface IAddress {
    _id?: string

}

export type IRole = 'user' | 'admin' | 'shop'