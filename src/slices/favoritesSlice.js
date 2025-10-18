import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const movie = action.payload;
            const exist = state.items.find(item => item.imdbID === movie.imdbID);

            if (!exist) {
                state.items.push(movie);
            } else {
                state.items = state.items.filter(item => item.imdbID !== movie.imdbID)
            }
        }
    }
})

export const {
    toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;