import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ListResponseModel } from 'models/common'
import { RootState } from 'redux/store'
import { ChatInitialState, IChat, IMessage } from './chatModel'
import chatService from './chatService'
import { FETCH_ALL_CHAT } from './chatActions'

const initialState: ChatInitialState = {
    list: [],
    countMsgUnread: 0,
    currenChat: {
        _id: '',
        messages: []
    },
    loading: false,
}

export const fetchAllChats = createAsyncThunk(FETCH_ALL_CHAT, async (data?: string) => {
    const res = await chatService.fetchAllChats(data)
    return res
})


export const getCountMsgUnread = createAsyncThunk(FETCH_ALL_CHAT, async (data?: string) => {
    const res = await chatService.fetchAllChats(data)
    return res
})

const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        sendMessage: (state: ChatInitialState, action: PayloadAction<IMessage>) => {
            state.currenChat = { ...state.currenChat, messages: [...state.currenChat?.messages, action.payload] }
        },
        sendMessageSuccess: (state: ChatInitialState, action: PayloadAction<IMessage>) => {
            state.currenChat = { ...state.currenChat, messages: [...state.currenChat?.messages, action.payload] }
        },
        respMessage: (state: ChatInitialState, action: PayloadAction<IMessage[]>) => {
            state.currenChat = { ...state.currenChat, messages: action.payload }
        },
        fetchCurentChat: (state: ChatInitialState, action: PayloadAction<string>) => {
            state.loading = true
        },
        fetchCurentChatSuccess: (state: ChatInitialState, action: PayloadAction<IChat>) => {
            state.currenChat = action.payload
            state.loading = false
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllChats.fulfilled, (state: ChatInitialState, action: PayloadAction<ListResponseModel<IChat>>) => {
            state.list = action.payload.data
            state.loading = true
        })
        builder.addCase(fetchAllChats.pending, (state: ChatInitialState) => {
            state.loading = true
        })
        builder.addCase(fetchAllChats.rejected, (state: ChatInitialState) => {
            state.loading = false
        })
    }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions
export const {
    sendMessage,
    sendMessageSuccess,
    respMessage,
    fetchCurentChat,
    fetchCurentChatSuccess
} = chatSlice.actions

export const selectChat = (state: RootState) => state.chat
