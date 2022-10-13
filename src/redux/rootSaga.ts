import { all } from 'redux-saga/effects'
import caroSaga from './caro/caroSaga'

export default function* rootSaga() {
    yield all([caroSaga()])
}
