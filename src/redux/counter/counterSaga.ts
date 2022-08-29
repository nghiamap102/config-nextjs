import { PayloadAction } from '@reduxjs/toolkit'
import { delay, put, takeLatest } from 'redux-saga/effects'
import { counterActions } from './counterSlice'

function* incrementSaga(action: PayloadAction) {
    try {
        yield delay(1000)
    } catch (error: any) {
        console.log(error)
    }
}

export default function* contactSaga() {
    yield takeLatest(counterActions.increment, incrementSaga)
}
