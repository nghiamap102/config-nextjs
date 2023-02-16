import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, put, takeLatest } from "redux-saga/effects";
import chatService from './chatService';
import { chatActions } from './chatSlice';

function* fetchCurentChat(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(chatService.fetchCurrentChat, action.payload)
        if (res.success) {
            yield put(chatActions.fetchCurentChatSuccess(res.data))
        }
    } catch (error: any) {
        console.log('server is error')
    }
}


function* sendMessage(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(chatService.sendMsg, action.payload)
        // if (res.success) {
        //     yield put(chatActions.sendMessageSuccess(res.data))
        // }
    } catch (error: any) {
        console.log('server is error')
    }
}


export default function* chatSaga() {
    yield takeLatest(chatActions.fetchCurentChat.type, fetchCurentChat)
    yield takeLatest(chatActions.sendMessage.type, sendMessage)
}