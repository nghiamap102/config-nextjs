export interface ChatInitialState {
    list?: IChat[]
    currenChat?: ICurrentChat
    loading?: boolean
    countMsgUnread?: number
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