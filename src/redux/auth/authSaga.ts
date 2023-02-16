import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import authService from './authService';
import { authActions, loginSuccess, updateUserSuccess } from './authSlice';
import { UPDATE_USER } from './authAction';

function* login(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(authService.login, action.payload)
        if (res.success) {
            yield put(loginSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}

function* updateUser(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(authService.updateUser, action.payload)
        if (res.success) {
            yield put(updateUserSuccess())
        }
    } catch (error: any) {
        console.log('server is error')
    }
}


export default function* authSaga() {
    yield takeLatest(authActions.login.type, login)
    yield takeLatest(UPDATE_USER, updateUser)
}