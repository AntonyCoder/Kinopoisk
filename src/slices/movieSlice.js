import { createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export function fetchMovies(searchQuery) {
    return async function fetchMoviesThunk(dispatch) {
        dispatch(clearMovies())
        dispatch(moviesLoading());

        try {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&s=${searchQuery}`);
            const data = await response.json();

            if (data.Response === 'True') {
                dispatch(moviesReceived(data.Search));
            } else {
                dispatch(moviesFailed(data.Error));
            }
        } catch (error) {
            dispatch(moviesFailed(error.message));
            console.error(error.message);
        }
    }
}

export function fetchMovieDetails(movieId) {
    return async function fetchMoviesDetailsThunk(dispatch) {
        dispatch(movieDetailsLoading());

        try {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&i=${movieId}`);
            const data = await response.json();

            if (data.Response === 'True') {
                dispatch(movieDetailsReceived(data));
            } else {
                dispatch(movieDetailsFailed(data.Error));
            }
        } catch (error) {
            dispatch(movieDetailsFailed(error.message));
            console.error(error.message);
        }
    }
}

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        items: [],
        currentMovie: null,
        loading: false,
        error: null,
    },
    reducers: {
        moviesLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        moviesReceived: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        moviesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        movieDetailsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        movieDetailsReceived: (state, action) => {
            state.loading = false;
            state.currentMovie = action.payload;
        },
        movieDetailsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearMovies: (state) => {
            state.items = [];
        },
    }
})

export const {
    moviesLoading,
    moviesReceived,
    moviesFailed,
    movieDetailsLoading,
    movieDetailsReceived,
    movieDetailsFailed,
    clearMovies,
} = movieSlice.actions;

export default movieSlice.reducer;