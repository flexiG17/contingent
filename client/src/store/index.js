import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import {createApi} from "../utils/api";

const api = createApi();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            }
        })
})
