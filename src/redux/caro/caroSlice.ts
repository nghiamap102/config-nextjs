import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CaroInitModel, PlayerModel } from './caroModel'

const initPlayer: PlayerModel = { name: '', result: false }
const initialState: CaroInitModel = {
    player1: initPlayer,
    player2: initPlayer,
    loading: false
}


const caroSlice = createSlice({
    name: 'caro',
    initialState,
    reducers: {
        setPlayer1: (state: CaroInitModel, action: PayloadAction<PlayerModel>) => {
            state.player1 = action.payload
        },
        setPlayer2: (state: CaroInitModel, action: PayloadAction<PlayerModel>) => {
            state.player2 = action.payload
        }
    },
})

export const caroReducer = caroSlice.reducer;

export const caroActions = caroSlice.actions;

export const {
    setPlayer1,
    setPlayer2
} = caroSlice.actions

export const selectCaro = (state: RootState) => state.caro
export const selectPlayer1 = (state: RootState) => state.caro.player1
export const selectPlayer2 = (state: RootState) => state.caro.player2
