import { Action, AnyAction, Store, ThunkAction, combineReducers, configureStore, } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware, { Task } from 'redux-saga'
import { CartInitState } from './cart/cartModel'
import { cartReducer } from './cart/cartSlice'
import { ChatInitialState } from './chat/chatModel'
import { chatReducer } from './chat/chatSlice'
import { CommonInitState } from './common/commonModel'
import { commonReducer } from './common/commonSlice'
import { ProductInitState } from './product/productModel'
import { productReducer } from './product/productSlice'
import rootSaga from './rootSaga'
import { checkoutReducer } from './checkout/checkoutSlice'
import { CheckoutInitState } from './checkout/checkoutModel'
import { OrderInitState } from './order/orderModel'
import { orderReducer } from './order/orderSlice'
import { AuthInitState } from './auth/authModel'
import { authReducer } from './auth/authSlice'

export interface State {
    common: CommonInitState
    cart: CartInitState
    product: ProductInitState
    checkout: CheckoutInitState
    order: OrderInitState
    auth: AuthInitState
    chat: ChatInitialState
}

const rootReducer = combineReducers({
    common: commonReducer,
    cart: cartReducer,
    product: productReducer,
    chat: chatReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    auth: authReducer,
})

const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        let nextState = {
            ...state,
            ...action.payload,
        }

        if (typeof window !== 'undefined' && state?.router) {
            nextState.router = state.router
            nextState = { ...nextState }
        }
        return rootReducer(nextState, action)
    } else {
        return rootReducer(state, action)
    }
}

export interface SagaStore extends Store {
    sagaTask: Task
}

const reHydrateStore = () => {
    return {}
}
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer,
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            sagaMiddleware,
        ),
    // devTools: true,
})

export const makeStore = () => {
    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)
    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export const wrapper = createWrapper<SagaStore>(makeStore as any)
