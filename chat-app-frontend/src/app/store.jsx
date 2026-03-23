import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice";
import userReducer from '../features/user-details/user-details-slice'
export const store = configureStore({
    reducer: {
        signup: signupReducer,
        user : userReducer
    }
});