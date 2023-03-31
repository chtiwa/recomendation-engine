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

export const getMovieRecommendationV_1 = createAsyncThunk('auth/getMovieRecommendationV_1', async (search, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/movies/recommend_1?movie_title=${search}`)
    return data
  } catch (error) {
    return rejectWithValue({ message: error?.response?.data?.message || 'There was an error' })
  }
})

const initialState = {
  movies: [],
  page: 1,
  totalPages: 50,
  getMoviesLoading: false,
  getMoviesError: false
}

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload
    }
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.getMoviesLoading = true
    },
    [getMovies.fulfilled]: (state, { payload }) => {
      state.getMoviesLoading = false
      state.movies = payload.movies
      state.page = Number(payload.page)
      state.totalPages = payload.totalPages
    },
    [getMovies.rejected]: (state, { payload }) => {
      state.getMoviesLoading = false
      state.getMoviesError = payload
    },
    [getMovieRecommendationV_1.pending]: (state) => {
      state.getMoviesLoading = true
    },
    [getMovieRecommendationV_1.fulfilled]: (state, { payload }) => {
      state.getMoviesLoading = false
      state.movies = payload.movies
      state.page = null
      state.totalPages = null
    },
    [getMovieRecommendationV_1.rejected]: (state, { payload }) => {
      state.getMoviesLoading = false
      state.getMoviesError = payload
    },
  }
})

export const { setPage } = moviesSlice.actions
export default moviesSlice.reducer 