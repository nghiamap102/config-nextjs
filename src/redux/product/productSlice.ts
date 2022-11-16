import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponseModel } from 'models/commonModel';
import { RootState } from 'redux/store';
import { ProductData, ProductInitState } from './productModel';

const initialState: ProductInitState = {
    detail: undefined,
    list: [],
    listSearch: [],
    loading: false
}


const productSync = () => {
    console.log('abc')
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductList: (state: ProductInitState, action: PayloadAction<ListResponseModel<ProductData>>) => {
            state.list = action.payload.data
        },
        fetchProductListSearch: (state: ProductInitState, action: PayloadAction<ListResponseModel<ProductData>>) => {
            state.list = action.payload.data
        }
    }
})

export const productReducer = productSlice.reducer;

export const {
    fetchProductList,
} = productSlice.actions

export const selectProuduct = (state: RootState) => state.common
export const selectListProduct = (state: RootState) => state.product.list
