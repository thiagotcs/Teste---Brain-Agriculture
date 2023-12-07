import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { producersSlice } from './producersSlice'

export const store = configureStore({
  reducer: {
    producers: producersSlice.reducer,
  },
})

export const { add } = producersSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
