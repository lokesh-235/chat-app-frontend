import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserDetailsAPI } from "../../apis/api";


const initialState = {
    userId : undefined,
    email : '',
    username : ''
}


export const getUserDetails = createAsyncThunk(
    "user/getUserDetails",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUserDetailsAPI();
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch user"
            );
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.userId = action.payload.id;
                state.email = action.payload.email;
                state.username = action.payload.username;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;