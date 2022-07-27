import { PayloadAction } from '@reduxjs/toolkit'
import { delay, takeLatest } from 'redux-saga/effects'
import { counterActions } from './counterSlice'

function* increment(action: PayloadAction) {
    try {
        yield delay(1000)
        console.log('abc')
    } catch (error: any) {
        console.log(error)
    }
}

export default function* contactSaga() {
    yield takeLatest(counterActions.increment, increment)
}
