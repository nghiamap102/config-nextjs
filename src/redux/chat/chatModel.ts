export interface ChatInitialState {
    currentChat?: {
        channel?: ICurrentChat
        messages?: IMessage
    }
}

export interface ICurrentChat {
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