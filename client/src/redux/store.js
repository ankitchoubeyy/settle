import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import journalReducer from "./slices/journalSlice.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        journal: journalReducer,
    }
})

export default store;