import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { CommonInitState } from './commonModel'

const initialState: CommonInitState = {
    searchKey: '',
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setSearchKey: (
            state: CommonInitState,
            action: PayloadAction<string>,
        ) => {
            state.searchKey = action.payload
        },
    },
})

export const commonReducer = commonSlice.reducer
export const commonActions = commonSlice.actions

export const { setSearchKey } = commonSlice.actions

export const selectCommon = (state: RootState) => state.common
export const selectSearchKey = (state: RootState) => state.common.searchKey
