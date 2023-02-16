import { all } from 'redux-saga/effects'
import cartSaga from './cart/cartSaga'
import checkoutSaga from './checkout/checkoutSaga';
import orderSaga from './order/orderSaga';
import chatSaga from './chat/chatSaga';
import authSaga from './auth/authSaga';

export default function* rootSaga() {
    yield all([cartSaga(), checkoutSaga(), orderSaga(), chatSaga(), authSaga()]);
}
