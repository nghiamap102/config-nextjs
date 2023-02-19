import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TestInitState } from './caroModel'

const initialState: TestInitState = {}

const testSlice = createSlice({
    name: 'caro',
    initialState,
    reducers: {},
})

export const testReducer = testSlice.reducer

export const testActions = testSlice.actions

export const {} = testSlice.actions

export const selectTest = (state: RootState) => state.test
