import { RootState } from 'redux/store';
import { ListResponseModel } from 'models/commonModel';
import { PayloadAction } from '@reduxjs/toolkit';
import { ChatInitialState, ICurrentChat } from './chatModel';
import { createSlice } from '@reduxjs/toolkit';


const initialState: ChatInitialState = {
    currentChat: {
        channel: null,
        messages: null
    }
}


const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        getMessages: (state: ChatInitialState, action: PayloadAction<ICurrentChat>) => {
            state.currentChat = action.payload
        }
    }
})



export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions
export const {
    getMessages
} = chatSlice.actions

export const chatSelector = (state: RootState) => state.chat