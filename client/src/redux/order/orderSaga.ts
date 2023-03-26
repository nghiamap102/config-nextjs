import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import orderService from './orderService';
import { orderActions } from './orderSlice';

function* createOrder(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(orderService.createOrder, action.payload)
        if (res.success) yield put(orderActions.createOrderSuccess(action.payload))
    } catch (error: any) {
        console.log('server is error')
    }
}


export default function* orderSaga() {
    yield takeLatest(orderActions.createOrder.type, createOrder)
}