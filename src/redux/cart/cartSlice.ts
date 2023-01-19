import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { isNonEmptyArray } from '@utils/validations'
import Cookies from 'js-cookie'
import { HYDRATE } from 'next-redux-wrapper'
import { IProductItem } from 'redux/product/productModel'
import { RootState } from '../store'
import { CartInitState, ICartItem } from './cartModel'

const initialState: CartInitState = {
    list: [],
    wishList: [],
    loading: false,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartList: (state: CartInitState, action: PayloadAction<any[]>) => {
            state.list = action.payload
        },
        addToCart: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            if (!state.list?.some(ele => ele.productId === action.payload.productId) && isNonEmptyArray(state.list)) {

                state.list?.push(action.payload)

            } else if (state.list?.some(ele => ele.productId === action.payload.productId) && isNonEmptyArray(state.list)) {
                const newArr = state.list?.map(cart => {
                    if (cart.productId === action.payload.productId) {
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
        },
        removeItemFromCart: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            const newArr = state.list?.filter(cart => {
                if (cart.productId !== action.payload.productId) {
                    return cart
                }
            })
            state.list = newArr
            Cookies.set('cart', JSON.stringify({ ...state }));
        },
        updateCart: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            state.list?.map(cart => {
                if (cart.productId === action.payload.productId) {
                    return { ...cart, count: action.payload }
                }
            })
            Cookies.set('cart', JSON.stringify({ ...state }));
        },
        updateCartItem: (state: CartInitState, action: PayloadAction<ICartItem>) => {
            state.list?.map(cart => {
                if (cart.productId === action.payload.productId) {
                    cart = action.payload
                }
                return cart
            })
        },
        addToWishList: (state: CartInitState, action: PayloadAction<IProductItem>) => {
            if (!state.wishList?.some(item => item.productId === action.payload.id)) {
                state.wishList?.push({ productId: action.payload.id })
            } else if (state.wishList.length < 0) {
                state.wishList?.push({ productId: action.payload.id })
            }
        },
        removeItemFromWishList: (state: CartInitState, action: PayloadAction<IProductItem>,) => {
            const newArr = state.wishList?.filter(cart => {
                if (cart.productId !== action.payload.id) {
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
            builder.addCase(
                'addCart',
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
    setCartList,
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
