import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponseModel } from "models/commonModel";
import { HYDRATE } from "next-redux-wrapper";
import { ProductData } from "redux/product/productModel";
import { RootState } from "../store";
import { CartInitState } from "./cartModel";

const initialState: CartInitState = {
	productList: [],
	loading: false
}


const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getProductList: (state: CartInitState, action: PayloadAction<ListResponseModel<ProductData>>) => {
			state.productList = action.payload.data
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
} = cartSlice.actions;


export const selectCart = (state: RootState) => state.cart;
export const selectCartList = (state: RootState) => state.cart.productList
