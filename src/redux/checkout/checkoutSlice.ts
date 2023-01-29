import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CheckoutInitState } from './checkoutModel'
import Cookies from 'js-cookie'

const initialState: CheckoutInitState = {
    list: [],
    loading: false,
    success: false
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        checkout: (state: CheckoutInitState, action: PayloadAction<any>) => {
            state.success = false
        },
        checkoutSuccess: (state: CheckoutInitState, action: PayloadAction<any>) => {
            state.success = true
            action.payload && Cookies.set('_id_ck', JSON.stringify(action.payload._id) )
        },
    },
})

export const checkoutReducer = checkoutSlice.reducer
export const checkoutActions = checkoutSlice.actions

export const {
    checkout,
    checkoutSuccess
} = checkoutSlice.actions

export const selectCheckout = (state: RootState) => state.checkout
