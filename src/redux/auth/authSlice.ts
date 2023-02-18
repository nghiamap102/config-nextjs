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

export const fetchAddress = createAsyncThunk(FETCH_ADDRESS, async (data: string) => {
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
        createAddressSuccess: (state: AuthInitState, action: PayloadAction<IAddress>) => {
            state.address = [...state.address, action.payload]
        },
        updateAddressSuccess: (state: AuthInitState, action: PayloadAction<IAddress>) => {
            const newArr = state.address?.map(address => {
                if (address._id === action.payload?._id) {
                    address = action.payload
                }
                return address
            })
            state.address = newArr
        },
        changeAddressDefaultSuccess: (state: AuthInitState, action: PayloadAction<IAddress>) => {
            const newArr = state.address?.map(address => {
                if (address._id === action.payload?._id) {
                    return { ...address, default: true }
                }
                return { ...address, default: false }
            })
            state.address = newArr
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
    updateUserSuccess,
    createAddressSuccess,
    updateAddressSuccess,
    changeAddressDefaultSuccess,
} = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
