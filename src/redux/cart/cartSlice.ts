import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isNonEmptyArray } from '@utils/validations'
import { ListResponseModel } from 'models/common'
import { IProductItem } from 'redux/product/productModel'
import { RootState } from '../store'
import { CartInitState, ICartItem } from './cartModel'
import cartService from './cartService'

const initialState: CartInitState = {
    list: [],
    wishList: [],
    loading: false,
    error: false
}

export const fetchCartList = createAsyncThunk('cart/list', async () => {
    const res = await cartService.getCartDetails()
    return res
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartList: (state: CartInitState, action: PayloadAction<any[]>) => {
            state.list = action.payload
        },
        addToCart: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            state.loading = true
        },
        addToCartSuccess: (state: CartInitState, action: PayloadAction<ICartItem>) => {

            if (!state.list?.some(ele => ele.product?._id === action.payload.product?._id) && isNonEmptyArray(state.list)) {

                state.list?.push(action.payload)

            } else if (state.list?.some(ele => ele.product?._id === action.payload.product?._id) && isNonEmptyArray(state.list)) {
                const newArr = state.list?.map(cart => {
                    if (cart.product?._id === action.payload.product?._id) {
                        return {
                            ...cart,
                            quantity: cart.quantity && cart.quantity + 1
                        }
                    }
                    return cart
                })
                state.list = newArr
            } else {
                state.list?.push(action.payload)
            }
            state.loading = false
        },
        addToCartFailed: (state: CartInitState) => {
            state.error = true
        },
        removeCartItem: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            state.loading = true
        },
        removeCartItemSuccess: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            const newArr = state.list?.filter(cart => {
                if (cart.product?._id !== action.payload.product?._id) {
                    return cart
                }
            })
            state.list = newArr
        },
        updateCartItem: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            state.loading = true
        },
        updateCartItemSuccess: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            state.list = state.list?.map(cart => {
                if (cart.product?._id === action.payload.product?._id) {
                    cart = action.payload
                }
                return cart
            })
            state.loading = false
        },
        addToWishList: (state: CartInitState, action: PayloadAction<IProductItem>) => {
            if (!state.wishList?.some(item => item.product_id === action.payload._id)) {
                state.wishList?.push({ product_id: action.payload._id })
            } else if (state.wishList.length < 0) {
                state.wishList?.push({ product_id: action.payload._id })
            }
        },
        removeItemFromWishList: (state: CartInitState, action: PayloadAction<IProductItem>) => {
            const newArr = state.wishList?.filter(cart => {
                if (cart.product_id !== action.payload._id) {
                    return cart
                }
            })
            state.wishList = newArr
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCartList.fulfilled, (state: CartInitState, action: PayloadAction<ListResponseModel<ICartItem>>) => {
            state.list = action.payload.data
            state.loading = false
        })
        builder.addCase(fetchCartList.pending, (state: CartInitState) => {
            state.loading = true
        })
        builder.addCase(fetchCartList.rejected, (state: CartInitState) => {
            state.list = []
            state.loading = true
        })
    },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions

export const {
    setCartList,
    addToCart,
    addToCartSuccess,
    addToCartFailed,
    removeCartItem,
    removeCartItemSuccess,
    updateCartItem,
    updateCartItemSuccess,
    addToWishList,
    removeItemFromWishList,
} = cartSlice.actions

export const selectCart = (state: RootState) => state.cart
export const selectCartList = (state: RootState) => state.cart.list
export const selectCartWishList = (state: RootState) => state.cart.wishList
