import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CheckoutInitState, DataCheckout, ICheckout, ResCheckout } from './checkoutModel'
import Cookies from 'js-cookie'
import checkoutService from './checkoutService'
import { ListResponseModel } from 'models/common'
import { ICartItem } from '@redux/cart/cartModel'

const initialState: CheckoutInitState = {
    list: {},
    loading: false,
    success: false
}


export const fetchCheckout = createAsyncThunk('checkout/fetch', async (data: string) => {
    const res = await checkoutService.getCheckout(data)
    return res
})

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        createCheckout: (state: CheckoutInitState, action: PayloadAction<DataCheckout[]>) => {
            state.success = false
        },
        createCheckoutSuccess: (state: CheckoutInitState, action: PayloadAction<DataCheckout[]>) => {
            state.success = true
            action.payload && Cookies.set('_id_ck', JSON.stringify(action.payload))
        },
        updateCheckoutItem: (state: CheckoutInitState, action: PayloadAction<ICartItem>) => {
            const newArr = state.list?.items?.map(checkout => {
                if (checkout.product?._id === action.payload.product?._id) {
                    checkout = action.payload
                }
                return checkout
            })
            state.list = { ...state, items: newArr }
            state.loading = false
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCheckout.fulfilled, (state: CheckoutInitState, action: PayloadAction<ListResponseModel<ICheckout>>) => {
            const newItem = action.payload.data && action.payload.data[0]
            state.list = newItem
            state.loading = false
        })
        builder.addCase(fetchCheckout.pending, (state: CheckoutInitState) => {
            state.loading = true
        })
        builder.addCase(fetchCheckout.rejected, (state: CheckoutInitState) => {
            state.list = {}
            state.loading = false
        })
    }
})

export const checkoutReducer = checkoutSlice.reducer
export const checkoutActions = checkoutSlice.actions

export const {
    createCheckout,
    createCheckoutSuccess,
    updateCheckoutItem
} = checkoutSlice.actions

export const selectCheckout = (state: RootState) => state.checkout
