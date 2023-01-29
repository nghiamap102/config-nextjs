import { all } from 'redux-saga/effects'
import cartSaga from './cart/cartSaga'
import checkoutSaga from './checkout/checkoutSaga';

export default function* rootSaga() {
    yield all([cartSaga(), checkoutSaga()]);
}
