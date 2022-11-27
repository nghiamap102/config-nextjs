import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponseModel } from 'models/commonModel';
import { RootState } from 'redux/store';
import { VoucherData, VoucherInitState } from "./voucherModel";

const initialState: VoucherInitState = {
    listVoucher: [],
    loading: false,
}


const voucherSync = () => {
    console.log('abc')
}

const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        fetchVucherList: (state: VoucherInitState, action: PayloadAction<ListResponseModel<VoucherData>>) => {
            state.listVoucher = action.payload.data
        },
        fetchVoucherListSearch: (state: VoucherInitState, action: PayloadAction<ListResponseModel<VoucherData>>) => {
            state.listVoucher = action.payload.data
        }
    }
})

export const voucherReducer = voucherSlice.reducer;

export const {
    fetchVoucherListSearch,
    fetchVucherList
} = voucherSlice.actions

export const selectvoucher = (state: RootState) => state.common
export const selectListVoucher = (state: RootState) => state.product.list
