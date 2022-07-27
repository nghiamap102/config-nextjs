import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '../store'
import { CounterModel } from './counterModel'
import counterService from './counterService'

const initialState: CounterModel = {
    count: 0,
    loading: false,
}

const fetching = createAsyncThunk(
    'counter/fetch',
    async (data: any, thunkApi: any) => {
        const res = await counterService.get(data)
        return res.data
    },
)

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state: CounterModel, action: PayloadAction) => {
            state.count += 1
        },
        decrement: (state: CounterModel, action: PayloadAction) => {
            state.count -= 1
        },
        incrementByAmount: (
            state: CounterModel,
            action: PayloadAction<number>,
        ) => {
            state.count += action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(HYDRATE, (state: CounterModel, action: any) => {
            state.count = action.payload
        })
        builder.addCase(
            fetching.pending,
            (state: CounterModel, action: any) => {
                state.count = action.payload
            },
        )
        builder.addCase(
            fetching.fulfilled,
            (state: CounterModel, action: any) => {
                state.count = action.payload
            },
        )
        builder.addCase(
            fetching.rejected,
            (state: CounterModel, action: any) => {
                state.count = action.payload
            },
        )
    },
})

export const counterReducer = counterSlice.reducer

export const counterActions = counterSlice.actions

export const { decrement, increment, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.count
