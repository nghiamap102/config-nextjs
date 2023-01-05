import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { isNonEmptyArray } from '@utils/validations'
import { ListResponseModel } from 'models/common'
import { HYDRATE } from 'next-redux-wrapper'
import { IProductItem } from 'redux/product/productModel'
import { RootState } from '../store'
import { CartData, CartInitState, ICartItem } from './cartModel'
import Cookies from 'js-cookie'

const initialState: CartInitState = {
    list: [],
    wishList: [],
    loading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state: CartInitState, action: PayloadAction<CartInitState>) => {
            state.list = action.payload.list
            state.wishList = action.payload.wishList
        },
        getListCart: (
            state: CartInitState,
            action: PayloadAction<ListResponseModel<CartData>>,
        ) => {
            state.list = action.payload.data
        },
        addToCart: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            const cartItem = {
                product: action.payload.product,
                quantity: 1,
                type: action.payload.type,
                created_at: new Date().getTime(),
                modified_at: new Date().getTime(),
                imageModel: action.payload.imageModel,
            }
            if (!state.list?.some(ele => ele.product.id === action.payload.product.id,) && isNonEmptyArray(state.list)) {

                state.list?.push(cartItem)

            } else if (state.list?.some(ele => ele.product.id === action.payload.product.id,) && isNonEmptyArray(state.list)) {
                const newArr = state.list?.map(cart => {
                    if (cart.product.id === action.payload.product.id) {
                        return {
                            ...cart,
                            quantity: cart.quantity + 1,
                            modified_at: new Date().getTime(),
                        }
                    }
                    return cart
                })
                state.list = newArr
            } else {
                state.list?.push(cartItem)
            }
            Cookies.set('cart', JSON.stringify({ ...state }));
        },
        removeItemFromCart: (
            state: CartInitState,
            action: PayloadAction<CartData>,
        ) => {
            const newArr = state.list?.filter(cart => {
                if (cart.product.id !== action.payload.product.id) {
                    return cart
                }
            })
            state.list = newArr
            Cookies.set('cart', JSON.stringify({ ...state }));
        },
        updateCart: (state: CartInitState, action: PayloadAction<CartData>) => {
            state.list?.map(cart => {
                if (cart.product.id === action.payload.product.id) {
                    return { ...cart, count: action.payload }
                }
            })
            Cookies.set('cart', JSON.stringify({ ...state }));
        },
        updateCartItem: (
            state: CartInitState,
            action: PayloadAction<CartData>,
        ) => {
            state.list?.map(cart => {
                if (cart.product.id === action.payload.product.id) {
                    cart = action.payload
                }
                return cart
            })
            Cookies.set('cart', JSON.stringify({ ...state }));
        },
        addToWishList: (
            state: CartInitState,
            action: PayloadAction<IProductItem>,
        ) => {
            if (!state.wishList?.some(item => item.id === action.payload.id)) {
                state.wishList?.push(action.payload)
            } else if (state.wishList.length < 0) {
                state.wishList?.push(action.payload)
            }
        },
        removeItemFromWishList: (
            state: CartInitState,
            action: PayloadAction<IProductItem>,
        ) => {
            const newArr = state.wishList?.filter(cart => {
                if (cart.id !== action.payload.id) {
                    return cart
                }
            })
            state.wishList = newArr
        },
        extraReducers: (builder: any) => {
            builder.addCase(
                HYDRATE,
                (state: CartInitState, action: PayloadAction<any>) => {
                    console.log('HYDRATE', action.payload)
                    state = { ...state, ...action.payload.cart }
                },
            )
        },
    },
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions

export const {
    setCart,
    getListCart,
    addToCart,
    removeItemFromCart,
    updateCart,
    updateCartItem,
    addToWishList,
    removeItemFromWishList,
} = cartSlice.actions

export const selectCart = (state: RootState) => state.cart
export const selectCartList = (state: RootState) => state.cart.list
export const selectCartWishList = (state: RootState) => state.cart.wishList
