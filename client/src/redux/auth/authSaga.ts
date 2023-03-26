import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import { CHANGE_ADDRESS_DEFAULT, CREATE_ADDRESS, LOGOUT, UPDATE_ADDRESS, UPDATE_USER } from './authAction';
import authService from './authService';
import { authActions, changeAddressDefaultSuccess, createAddressSuccess, haveError, loginSuccess, logout, updateAddressSuccess, updateUserSuccess } from './authSlice';
import imageService from '@redux/image/imgService';

function* updateUser(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        yield put(authActions.dispatchloading)
        const formData = new FormData()
        formData.append('file', action.payload.avatar)
        const avatar = yield call(imageService.uploadAvatar, formData)
        const res = yield call(authService.updateUser, { ...action.payload, avatar: avatar.data[0].id })
        if (res && avatar) {
            yield put(authActions.dispatchSuccess)
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

function* logoutSaga(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(authService.logout, action.payload)
        if (res.success) {
            yield put(logout())
        }
    } catch (error: any) {
        yield put(haveError(true))
        console.log('server is error')
    }
}


export default function* authSaga() {
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(CREATE_ADDRESS, createAddress)
    yield takeLatest(UPDATE_ADDRESS, updateAddress)
    yield takeLatest(CHANGE_ADDRESS_DEFAULT, changeAddressDefault)
    yield takeLatest(LOGOUT, logoutSaga)
}