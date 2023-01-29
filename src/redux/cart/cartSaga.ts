import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import cartService from './cartService';
import { cartActions } from "./cartSlice";

function* updateCartItem(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(cartService.updateCart, action.payload)
        if (res.success) {
            yield put(cartActions.updateCartItemSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}


function* addCartItem(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(cartService.addToCart, action.payload)
        if (res.success) {
            yield put(cartActions.addToCartSuccess(res.data))
        }
    } catch (error: any) {
        yield put(cartActions.addToCartFailed())
    }
}

export default function* cartSaga() {
    yield takeLatest(cartActions.updateCartItem.type, updateCartItem)
    yield takeLatest(cartActions.addToCart.type, addCartItem)
}