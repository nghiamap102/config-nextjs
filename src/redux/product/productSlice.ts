import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ListResponseModel } from 'models/common'
import { RootState } from 'redux/store'
import { IProductCategory, IProductItem, ProductInitState } from './productModel'
import ProductService from './productService'
import { FETCH_PRODUCT_CATEGORY, FETCH_PRODUCT_LIST } from './productAction'

const initialState: ProductInitState = {
    detail: null,
    list: [],
    category:[],
    listSearch: [],
    loading: false,
}

export const fetchProductList = createAsyncThunk(FETCH_PRODUCT_LIST, async () => {
    const res = await ProductService.getProduct()
    return res.data
})

export const fetchProductCategory = createAsyncThunk(FETCH_PRODUCT_CATEGORY, async () => {
    const res = await ProductService.getProductCategory()
    return res.data
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductListSuccess: (state: ProductInitState, action: PayloadAction<ListResponseModel<IProductItem>>) => {
            state.list = action.payload.data
        },
        fetchProductListSearch: (state: ProductInitState, action: PayloadAction<ListResponseModel<IProductItem>>) => {
            state.list = action.payload.data
        },
        getProductById: (state: ProductInitState, action: PayloadAction<IProductItem>) => {
            state.detail = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProductList.fulfilled, (state: ProductInitState, action: PayloadAction<ListResponseModel<IProductItem>>) => {
            state.list = action.payload.data
        })
        builder.addCase(fetchProductCategory.fulfilled, (state: ProductInitState, action: PayloadAction<ListResponseModel<IProductCategory>>) => {
            state.category = action.payload.data
        })
        builder.addCase(fetchProductList.pending, (state: ProductInitState) => {
            state.loading = true
        })
        builder.addCase(fetchProductList.rejected, (state: ProductInitState) => {
            state.list = []
        })
    },
})

export const productReducer = productSlice.reducer
export const productActions = productSlice.actions

export const { fetchProductListSuccess, getProductById } = productSlice.actions

export const selectProduct = (state: RootState) => state.product
export const selectListProduct = (state: RootState) => state.product.list
