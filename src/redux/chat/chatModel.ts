export interface ChatInitialState {
    currentChat?: ICurrentChat
    loading?: boolean
    erorr?: boolean
    success?: boolean
}
export interface ICurrentChat {
    channel?: IChannel
    messages?: IMessage[]
}
export interface IChannel {
    channelId?: string
    name?: string
    user_auth?: boolean
    shop_auth?: boolean
    admin_auth?: boolean
    last_post_at?: number
    delete_at?: number
    modified_at?: number
    created_at?: number
}

export interface IMessage {
    id?: string
    content?: string
    post_at?: number
    creator_id?: string
    deleted_at?: string
    modified_at?: number
}

export const FETCH_CURRENT_CHAT = 'FETCH_CURRENT_CHAT'