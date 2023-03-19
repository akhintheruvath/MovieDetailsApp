import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async (term) => {
        const response = await MovieApi
            .get(`?apiKey=${APIKey}&s=${term}&type=movie`)
            .catch(err => console.log("Error: ",err));
        return response.data;
    }
)

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows',
    async (term) => {
        const response = await MovieApi
            .get(`?apiKey=${APIKey}&s=${term}&type=series`)
            .catch(err => console.log("Error: ",err));
        return response.data;
    }
)

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail',
    async (id) => {
        const response = await MovieApi
            .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
            .catch(err => console.log("Error: ",err));
        return response.data;
    }
)

const initialState = {
    movies:{},
    shows:{},
    selectedMovieOrShow:{}
}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAsyncMovies.pending, () => {
            console.log("Pending movies");
        }).addCase(fetchAsyncMovies.fulfilled, (state,{ payload }) => {
            console.log("Fulfilled movies");
            state.movies = payload;
        }).addCase(fetchAsyncMovies.rejected, () => {
            console.log("Rejected movies");
        }).addCase(fetchAsyncShows.pending, () => {
            console.log("Pending shows");
        }).addCase(fetchAsyncShows.fulfilled, (state,{ payload }) => {
            console.log("Fulfilled shows");
            state.shows = payload;
        }).addCase(fetchAsyncShows.rejected, () => {
            console.log("Rejected shows");
        }).addCase(fetchAsyncMovieOrShowDetail.pending, () => {
            console.log("Pending details");
        }).addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
            console.log("Fulfilled details");
            state.selectedMovieOrShow = payload;
        }).addCase(fetchAsyncMovieOrShowDetail.rejected, () => {
            console.log("Rejected details");
        })
    }
})

export default movieSlice.reducer;
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrshow = (state) => state.movies.selectedMovieOrShow;