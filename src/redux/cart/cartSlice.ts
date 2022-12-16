import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNonEmptyArray, isNonEmptyString } from "@utils/validations";
import { ListResponseModel } from "models/commonModel";
import { HYDRATE } from "next-redux-wrapper";
import { IProductItem } from "redux/product/productModel";
import { RootState } from "../store";
import { CartData, CartInitState, ICartItem } from "./cartModel";

const initialState: CartInitState = {
	list: [],
	wishList: [],
	loading: false
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getProductList: (state: CartInitState, action: PayloadAction<ListResponseModel<CartData>>) => {
			state.list = action.payload.data
		},
		addToCart: (state: CartInitState, action: PayloadAction<ICartItem>) => {
			state.loading = true
			if (!state.list?.some(ele => ele.productId === action.payload.productId) && isNonEmptyArray(state.list)) {

				state.list?.push({ productId: isNonEmptyString(action.payload.productId), quantity: 1, type: action.payload.type, created_at: new Date().getTime(), modified_at: new Date().getTime() })

			} else if (state.list?.some(ele => ele.productId === action.payload.productId) && isNonEmptyArray(state.list)) {

				const newArr = state.list?.map(cart => {
					if (cart.productId === action.payload.productId) {
						return { ...cart, count: cart.quantity + 1, modified_at: new Date().getTime() }
					}
					return cart
				})

				state.list = newArr

			} else {
				state.list?.push({ productId: isNonEmptyString(action.payload.productId), quantity: 1, type: action.payload.type, created_at: new Date().getTime(), modified_at: new Date().getTime() })
			}

			// setTimeout(() => {
			// 	state.loading = false
			// }, 1000);
		},
		removeItemFromCart: (state: CartInitState, action: PayloadAction<IProductItem>) => {
			const newArr = state.list?.filter(cart => {
				if (cart.productId !== action.payload.id) {
					return cart
				}
			})
			state.list = newArr
		},
		updateCart: (state: CartInitState, action: PayloadAction<CartData>) => {
			state.list?.map(cart => {
				if (cart.productId === action.payload.productId) {
					return { ...cart, count: action.payload }
				}
			})
		},
		addToWishList: (state: CartInitState, action: PayloadAction<IProductItem>) => {
			state.wishList?.push(action.payload)
		},
		removeItemFromWishList: (state: CartInitState, action: PayloadAction<IProductItem>) => {
			const newArr = state.wishList?.filter(cart => {
				if (cart.id !== action.payload.id) {
					return cart
				}
			})
			state.wishList = newArr
		},
		extraReducers: (builder: any) => {
			builder.addCase(HYDRATE, (state: CartInitState, action: PayloadAction<any>) => {
				console.log('HYDRATE', action.payload)
				state = { ...state, ...action.payload.cart };
			})
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

export const {
	getProductList,
	addToCart,
	removeItemFromCart,
	updateCart,
	addToWishList,
	removeItemFromWishList
} = cartSlice.actions;


export const selectCart = (state: RootState) => state.cart;
export const selectCartList = (state: RootState) => state.cart.list
export const selectCartWishList = (state: RootState) => state.cart.wishList
