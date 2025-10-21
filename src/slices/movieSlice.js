import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

function removeDuplicates(movies) {
    if (!movies || !Array.isArray(movies)) return [];

    const unique = movies.filter((movie, index, self) => {
        return index === self.findIndex(m => m.imdbID === movie.imdbID);
    })

    return unique;
}

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&s=${searchQuery}`);
            const data = await response.json();

            if (data.Response === 'True') {
                return data.Search;
            } else {
                return rejectWithValue(data.Error || 'Movies not found');
            }
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
)

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&i=${movieId}`);
            const data = await response.json();

            if (data.Response === 'True') {
                return data
            } else {
                return rejectWithValue(data.Error);
            }
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
)

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        items: [],
        currentMovie: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearMovies: (state) => {
            state.items = [];
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            //fetchMovies
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetchMovieDetails
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentMovie = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { clearMovies } = movieSlice.actions;

export const selectUniqueMovies = (state) => removeDuplicates(state.movies.items);

export default movieSlice.reducer;