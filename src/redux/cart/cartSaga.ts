import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import cartService from './cartService';
import { cartActions } from "./cartSlice";

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
function* removeCartItem(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(cartService.deleteItem, action.payload)
        if (res.success) {
            yield put(cartActions.removeCartItemSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}

export default function* cartSaga() {
    yield takeLatest(cartActions.updateCartItem.type, updateCartItem)
    yield takeLatest(cartActions.addToCart.type, addCartItem)
    yield takeLatest(cartActions.removeCartItem.type, removeCartItem)
}