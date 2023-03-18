import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ListResponseModel } from 'models/common'
import { RootState } from 'redux/store'
import { FETCH_ALL_PRODUCT, FETCH_PRODUCT_CATEGORY } from './productAction'
import { IComment, ICommentRating, IFilterCategory, IProductCategoryLabel, IProductItem, ProductInitState } from './productModel'
import ProductService from './productService'
import { LIMIT_PAGE } from 'contants/common'

const initialState: ProductInitState = {
    detail: null,
    list: [],
    category: [],
    listSearch: [],
    comment: [],
    commentRating: {},
    facet: [],
    loading: false,
    count: 0,
    newProduct: [],
}

export const fetchProductCategory = createAsyncThunk(FETCH_PRODUCT_CATEGORY, async () => {
    const res = await ProductService.getProductCategory()
    return res
})

export const fetchAllProduct = createAsyncThunk(FETCH_ALL_PRODUCT, async (page: number) => {
    const res = await ProductService.getProduct(`page=${page}`)
    return res
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading: (state: ProductInitState, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCount: (state: ProductInitState, action: PayloadAction<number>) => {
            state.count = action.payload
        },
        setProductList: (state: ProductInitState, action: PayloadAction<IProductItem[]>) => {
            state.list = action.payload
            state.loading = false
        },
        setFacet: (state: ProductInitState, action: PayloadAction<IFilterCategory[]>) => {
            state.facet = action.payload
            state.loading = false
        },
        setNewProduct: (state: ProductInitState, action: PayloadAction<IProductItem[]>) => {
            state.newProduct = action.payload
            state.loading = false
        },
        getProductById: (state: ProductInitState, action: PayloadAction<IProductItem>) => {
            state.detail = action.payload
        },
        fetchCommentRating: (state: ProductInitState, action: PayloadAction<ICommentRating>) => {
            state.commentRating = action.payload
        },
        fetchComment: (state: ProductInitState, action: PayloadAction<IComment[]>) => {
            state.comment = action.payload
        },
        fetchCategory: (state: ProductInitState, action: PayloadAction<IProductCategoryLabel[]>) => {
            state.category = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProductCategory.fulfilled, (state: ProductInitState, action: PayloadAction<ListResponseModel<IProductCategoryLabel>>) => {
            state.category = action.payload?.data
        })
        builder.addCase(fetchProductCategory.pending, (state: ProductInitState) => {
            state.loading = true
        })
        builder.addCase(fetchProductCategory.rejected, (state: ProductInitState) => {
            state.category = []
        })
        builder.addCase(fetchAllProduct.fulfilled, (state: ProductInitState, action: PayloadAction<ListResponseModel<IProductItem>>) => {
            state.list = action.payload?.data
        })
        builder.addCase(fetchAllProduct.pending, (state: ProductInitState) => {
            state.loading = true
        })
        builder.addCase(fetchAllProduct.rejected, (state: ProductInitState) => {
            state.list = []
        })
    },
})

export const productReducer = productSlice.reducer
export const productActions = productSlice.actions

export const {
    setLoading,
    setCount,
    setNewProduct,
    setProductList,
    setFacet,
    fetchComment,
    fetchCategory,
    fetchCommentRating,
    getProductById,
} = productSlice.actions

export const selectProduct = (state: RootState) => state.product
export const selectListProduct = (state: RootState) => state.product.list
