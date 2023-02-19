import { PayloadAction } from '@reduxjs/toolkit'
import { delay, takeLatest } from 'redux-saga/effects'

function* test(action: PayloadAction) {
    try {
        yield delay(1000)
    } catch (error: any) {
        console.log(error)
    }
}

export default function* testSaga() {
    yield takeLatest('abc', test)
}
