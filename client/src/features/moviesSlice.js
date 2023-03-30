import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../axios'

export const getMovies = createAsyncThunk('auth/getMovies', async (page, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/movies?page=${page}`)
    return data
  } catch (error) {
    return rejectWithValue({ message: error?.response?.data?.message || 'There was an error' })
  }
})

const initialState = {
  movies: [],
  page: 1,
  lastPage: 10,
  getMoviesLoading: false,
  getMoviesError: false
}

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {

  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.getMoviesLoading = true
    },
    [getMovies.fulfilled]: (state, { payload }) => {
      state.getMoviesLoading = false
      state.movies = payload.movies
    },
    [getMovies.pending]: (state, { payload }) => {
      state.getMoviesLoading = false
      state.getMoviesError = payload
    },
  }
})

export default moviesSlice.reducer 