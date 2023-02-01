export interface IUser {
    _id?: string
    name?: string
    email?: string
    phone?: string
    role?: IUserRole
}


export type IUserRole = 'user' | 'admin' | 'shop'