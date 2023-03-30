import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import moviesReducer from './features/moviesSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})