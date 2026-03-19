import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupAPI } from "../../apis/api";


const initialState = {
    username: "",
    email: "",
    password: ""
};

export const signupUser = createAsyncThunk(
    "signup/signupUser",
    async (data) => {
        const res = await signupAPI(data);
        console.log(res.data);
        return res.data;
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        changeUsername: (state, action) => {
            state.username = action.payload;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = "success";
                state.message = action.payload;
            })
            .addCase(signupUser.rejected, (state) => {
                state.status = "error";
            });
    }
});

// actions
export const { changeUsername, changeEmail, changePassword } = signupSlice.actions;

// reducer
export default signupSlice.reducer;