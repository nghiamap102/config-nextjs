import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponseModel } from 'models/commonModel';
import { RootState } from 'redux/store';
import { VoucherData, VoucherInitState } from "./voucherModel";
import voucherService from "./voucherService";

const initialState: VoucherInitState = {
    listVoucher: [],
    loading: false,
}


export const fetchVoucher = createAsyncThunk(
    'voucher/list',
    async () => {
        const res = await voucherService.getVoucherList();
        return res.data
    }
)

export const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        fetchVoucherListSearch: (state: VoucherInitState, action: PayloadAction<ListResponseModel<VoucherData>>) => {
            state.listVoucher = action.payload.data
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVoucher.fulfilled, (state: VoucherInitState, action: PayloadAction<ListResponseModel<VoucherData>>)=>{
            state.listVoucher = action.payload.data
        })
        builder.addCase(fetchVoucher.pending, (state: VoucherInitState)=>{
            state.listVoucher = []
            state.loading = true
        })
        builder.addCase(fetchVoucher.rejected, (state: VoucherInitState)=>{
            state.listVoucher = []
            state.loading = true
        })
    }
})

export const voucherReducer = voucherSlice.reducer;
export const voucherActions = voucherSlice.actions;

export const {
    fetchVoucherListSearch,
} = voucherSlice.actions

export const selectvoucher = (state: RootState) => state.common
export const selectListVoucher = (state: RootState) => state.product.list
