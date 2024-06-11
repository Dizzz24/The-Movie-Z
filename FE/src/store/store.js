import { configureStore } from "@reduxjs/toolkit";

import movieSlice from "./features/fetchMovies";
import quoteSlices from "./features/fetchQuote";

const store = configureStore({
    reducer: {
        movies: movieSlice,
        quotes: quoteSlices
    }
})

export default store