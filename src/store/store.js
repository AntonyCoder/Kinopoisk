import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../slices/movieSlice';
import favoritesReducer from "../slices/favoritesSlice";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        favorites: favoritesReducer,
    }
})

export default store;