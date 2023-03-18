import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { DataResponseModel } from 'models/common';
import { CallEffect, PutEffect, call, delay, put, takeLatest } from "redux-saga/effects";
import { FETCH_CATEGORY_CHILDREN, FETCH_COMMENT, FETCH_COMMENT_RATING, FETCH_FACET, FETCH_NEW_PRODUCT, FETCH_PRODUCT_BY_CATEGORY, FETCH_PRODUCT_BY_CATEGORY_FILTER, FETCH_PRODUCT_BY_ID } from './productAction';
import { ICommentRating } from './productModel';
import productService from './productService';
import { fetchCategory, fetchComment, fetchCommentRating, getProductById, setCount, setFacet, setFilterCategory, setLoading, setNewProduct, setProductList } from './productSlice';

function* getProductByid(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(productService.getProductById, action.payload)
        if (res.success) yield put(getProductById(res.data))
    } catch (error: any) {
        console.log('server is error')
    }
}

function* fetchRatingSaga(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<ICommentRating>> {
    try {
        const rating = yield call(productService.fetchCommentRating, action.payload)
        const type = Object.keys(rating.data?.filter)[0]
        const cmt = yield call(productService.fetchComment, { product_id: rating.data?.star_avg?._id, page: 1, type })
        if (rating.success) yield put(fetchCommentRating(rating.data))
        if (cmt.success) yield put(fetchComment(cmt.data))
    } catch (error: any) {
        console.log('server is error')
    }
}

function* fetchCommentSaga(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(productService.fetchComment, action.payload)
        if (res.success) yield put(fetchComment(res.data))
    } catch (error: any) {
        console.log('server is error')
    }
}

function* fetchCategoryChildSaga(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(productService.fetchCategoryChild, action.payload)
        if (res.success) yield put(fetchCategory(res.data))
    } catch (error: any) {
        console.log('server is error')
    }
}

function* fetchProductByCategory(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        yield put(setLoading(true))
        const res = yield call(productService.searchProduct, action.payload)
        yield put(setCount(res.length))
        yield delay(500)
        if (res.success) yield put(setProductList(res.data))
    } catch (error: any) {
        console.log('server is error')
    }
}


function* fetchFacet(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(productService.getFacet, action.payload)
        if (res.success) yield put(setFacet(res.data))
    } catch (error: any) {
        console.log('server is error')
    }
}


function* fetchNewProduct(action: PayloadAction): Generator<CallEffect<DataResponseModel<any>> | PutEffect<AnyAction>, void, DataResponseModel<any>> {
    try {
        const res = yield call(productService.getNewProduct, action.payload)
        if (res.success) yield put(setNewProduct(res.data))
    } catch (error: any) {
        console.log('server is error')
    }
}


export default function* productSaga() {
    yield takeLatest(FETCH_PRODUCT_BY_ID, getProductByid)
    yield takeLatest(FETCH_COMMENT_RATING, fetchRatingSaga)
    yield takeLatest(FETCH_COMMENT, fetchCommentSaga)
    yield takeLatest(FETCH_CATEGORY_CHILDREN, fetchCategoryChildSaga)
    yield takeLatest(FETCH_PRODUCT_BY_CATEGORY, fetchProductByCategory)
    yield takeLatest(FETCH_FACET, fetchFacet)
    yield takeLatest(FETCH_NEW_PRODUCT, fetchNewProduct)
}