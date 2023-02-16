export interface ChatInitialState {
    list?: IChat[]
    currenChat?: ICurrentChat
    loading?: boolean
    erorr?: boolean
    success?: boolean
}
export interface ICurrentChat {
    _id?: string
    messages?: IMessage[]
}
export interface IChat {
    _id?: string
    partner?: any
    members?: any
    unread?: number
    last_post_at?: number
    last_message?: IMessage
    delete_at?: number
}

export interface IMessage {
    id?: string
    chat_id?: string
    content?: string
    sender_id?: string
    deleted_at?: string
    createdAt?: string
}

export const FETCH_ALL_CHAT = 'FETCH_ALL_CHAT'
export const SEND_MESSAGE = 'send_message'
export const MESSAGE_RESPONSE = 'message_response'