import {configureStore} from "@reduxjs/toolkit";
import {superJobAPI} from "./superJobAPI";


export const store = configureStore({
    reducer: {
        [superJobAPI.reducerPath]: superJobAPI.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(superJobAPI.middleware)
})