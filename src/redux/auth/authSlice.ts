import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthInitState, IAddress, IUser } from './authModel'
import { FETCH_ADDRESS } from './authAction'
import authService from './authService'
import { ListResponseModel } from 'models/common'

const initialState: AuthInitState = {
    user: {},
    address: [],
    loading: false,
    error: false,
    updateSuccess: false,
}

const fetchAddress = createAsyncThunk(FETCH_ADDRESS, async (data) => {
    const res = await authService.fetchAddress(data)
    return res
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthInitState, action: PayloadAction<any[]>) => {
            state.loading = true
        },
        loginSuccess: (state: AuthInitState, action: PayloadAction<IUser>) => {
            state.loading = false
            state.user = action.payload
        },
        updateUserSuccess: (state: AuthInitState) => {
            state.updateSuccess = true
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAddress.fulfilled, (state: AuthInitState, action: PayloadAction<ListResponseModel<IAddress>>) => {
            state.address = action.payload.data
            state.loading = false
        })
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions

export const {
    login,
    loginSuccess,
    updateUserSuccess
} = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
