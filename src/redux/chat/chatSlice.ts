import { RootState } from 'redux/store'
import { ListResponseModel } from 'models/common'
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ChatInitialState, FETCH_CURRENT_CHAT, ICurrentChat, IMessage } from './chatModel'
import { createSlice } from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState: ChatInitialState = {
    currentChat: {
        channel: null,
        messages: [],
    },
}


export const fetchCurrenChat = createAsyncThunk(FETCH_CURRENT_CHAT, async (data: any) => {
    const res = await chatService.fetchCurrentChat(data)
    return res
})


const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchCurrenChat.fulfilled, (state: ChatInitialState, action: PayloadAction<ListResponseModel<ICurrentChat>>) => {
            state.loading = true
            // state.currentChat = action.payload.data
        })
        builder.addCase(fetchCurrenChat.pending, (state: ChatInitialState) => {
            state.loading = true
        })
        builder.addCase(fetchCurrenChat.rejected, (state: ChatInitialState) => {
            state.loading = false
            state.currentChat = {}
        })
    }
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions
// export const {

// } = chatSlice.actions

export const chatSelector = (state: RootState) => state.chat
