import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { OrderInitState } from './orderModel'
import OrderService from './orderService'
import { ListResponseModel } from 'models/common'
import Cookies from 'js-cookie'

const initialState: OrderInitState = {
    list: [],
    loading: false,
    error: false,
    success: false
}

export const fetchOrderList = createAsyncThunk('cart/list', async (data: string) => {
    const res = await OrderService.fetchOrderList(data)
    return res
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setSuccesState: (state: OrderInitState) => {
            state.success = false
        },
        createOrder: (state: OrderInitState, action: PayloadAction<any>) => {
            state.success = false
        },
        createOrderSuccess: (state: OrderInitState, action: PayloadAction<any>) => {
            state.success = true    
            Cookies.remove('_id_ck')
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrderList.fulfilled, (state: OrderInitState, action: PayloadAction<ListResponseModel<any>>) => {
            state.list = action.payload.data
            state.loading = false
        })
        builder.addCase(fetchOrderList.pending, (state: OrderInitState) => {
            state.loading = true
        })
        builder.addCase(fetchOrderList.rejected, (state: OrderInitState) => {
            state.loading = false
        })
    },
})

export const orderReducer = orderSlice.reducer
export const orderActions = orderSlice.actions

export const {
    createOrder,
    createOrderSuccess,
    setSuccesState,
} = orderSlice.actions

export const selectOrder = (state: RootState) => state.order
