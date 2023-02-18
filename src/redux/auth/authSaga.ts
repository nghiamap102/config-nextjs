import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import { CHANGE_ADDRESS_DEFAULT, CREATE_ADDRESS, UPDATE_ADDRESS, UPDATE_USER } from './authAction';
import authService from './authService';
import { authActions, changeAddressDefaultSuccess, createAddressSuccess, loginSuccess, updateAddressSuccess, updateUserSuccess } from './authSlice';

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

function* createAddress(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(authService.createAddress, action.payload)
        console.log(res)
        if (res.success) {
            yield put(createAddressSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}


function* updateAddress(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(authService.updateAddress, action.payload)
        console.log(res)
        if (res.success) {
            yield put(updateAddressSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}

function* changeAddressDefault(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(authService.changeAddressDefault, action.payload)
        console.log(res)
        if (res.success) {
            yield put(changeAddressDefaultSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}


export default function* authSaga() {
    yield takeLatest(authActions.login.type, login)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(CREATE_ADDRESS, createAddress)
    yield takeLatest(UPDATE_ADDRESS, updateAddress)
    yield takeLatest(CHANGE_ADDRESS_DEFAULT, changeAddressDefault)
}