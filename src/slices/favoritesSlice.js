import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
    },
    reducers: {
        toggleFavorite: (state, action) => {

            const movie = action.payload;
            const index = state.items.findIndex(item => item.imdbID === movie.imdbID);

            if (index === -1) {
                state.items.push(movie);
            } else {
                state.items.splice(index, 1);
            }
        }
    }
})

export const {
    toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;