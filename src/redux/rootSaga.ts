import { all } from 'redux-saga/effects'
import contactSaga from './counter/counterSaga'

export default function* rootSaga() {
    yield all([contactSaga()])
}
