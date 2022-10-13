import { PayloadAction } from '@reduxjs/toolkit'
import { delay, takeLatest } from 'redux-saga/effects'
import { caroActions } from './caroSlice'

function* incrementSaga(action: PayloadAction) {
    try {
        yield delay(1000)
    } catch (error: any) {
        console.log(error)
    }
}

export default function* caroSaga() {
    yield takeLatest(caroActions.setPlayer1.type, incrementSaga)
}
