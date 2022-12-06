import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponseModel } from 'models/commonModel';
import { RootState } from 'redux/store';
import { ProductData, ProductInitState } from './productModel';
import ProductService from "./productService";

const initialState: ProductInitState = {
    detail: null,
    list: [],
    listSearch: [],
    loading: false
}


export const fetchProductList = createAsyncThunk(
    'product/list',
    async () => {
        const response = await ProductService.fetchProduct()
        return response.data
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductListSuccess: (state: ProductInitState, action: PayloadAction<ListResponseModel<ProductData>>) => {
            state.list = action.payload.data
        },
        // getProductDetail: (state: ProductInitState, action: PayloadAction<string>) => {
        //     const newArr = state.list?.filter(product => {
        //         if (product.id === action.payload) {
        //             return product
        //         }
        //     })
        //     newArr ? state.detail = newArr[0] : state.detail = null
        // },
        fetchProductListSearch: (state: ProductInitState, action: PayloadAction<ListResponseModel<ProductData>>) => {
            state.list = action.payload.data
        },
        getProductById: (state: ProductInitState, action: PayloadAction<ProductData>) => {
            state.detail = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductList.fulfilled, (state: ProductInitState, action: PayloadAction<ListResponseModel<ProductData>>) => {
            state.list = action.payload?.data
        })
        builder.addCase(fetchProductList.pending, (state: ProductInitState) => {
            state.loading = true
        })
        builder.addCase(fetchProductList.rejected, (state: ProductInitState) => {
            state.list = []
        })
    }
})

export const productReducer = productSlice.reducer
export const productAction = productSlice.actions

export const {
    fetchProductListSuccess,    
    getProductById,
} = productSlice.actions

export const selectProduct = (state: RootState) => state.common
export const selectListProduct = (state: RootState) => state.product.list
