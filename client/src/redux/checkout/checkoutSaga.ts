import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import checkoutService from './checkoutService';
import { checkoutActions } from './checkoutSlice';

function* checkout(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(checkoutService.createCheckout, action.payload)
        if (res.success) {
            yield put(checkoutActions.createCheckoutSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}

export default function* checkoutSaga() {
    yield takeLatest(checkoutActions.createCheckout.type, checkout)
}