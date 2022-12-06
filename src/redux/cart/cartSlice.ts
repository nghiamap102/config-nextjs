import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponseModel } from "models/commonModel";
import { HYDRATE } from "next-redux-wrapper";
import { ProductData } from "redux/product/productModel";
import { RootState } from "../store";
import { CartData, CartInitState } from "./cartModel";

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
		addToCart: (state: CartInitState, action: PayloadAction<ProductData>) => {
			state.list?.push({ product: action.payload, count: 1 })
		},
		removeItemFromCart: (state: CartInitState, action: PayloadAction<ProductData>) => {
			const newArr = state.list?.filter(cart => {
				if (cart.product.id !== action.payload.id) {
					return cart
				}
			})
			state.list = newArr
		},
		updateCart: (state: CartInitState, action: PayloadAction<CartData>) => {
			state.list?.map(cart => {
				if (cart.product.id === action.payload.product.id) {
					return { ...cart, count: action.payload }
				}
			})
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
} = cartSlice.actions;


export const selectCart = (state: RootState) => state.cart;
export const selectCartList = (state: RootState) => state.cart.list
