import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthApis = createAsyncThunk(
    "authApis/getAuthApis",
    async () => {
        return await fetch(`http://` + process.env.REACT_APP_ROOT_DOMAIN + `:` + process.env.REACT_APP_AUTH_PORT + `/api/`)
            .then((res) => res.json());
    }
);

const authApisSlice = createSlice({
    name: "authApis",
    initialState: {
        apis: {},
        status: null,
    },
    extraReducers: {
        [getAuthApis.pending]: (state, action) => {
            state.status = "loading";
        },
        [getAuthApis.fulfilled]: (state, action) => {
            state.status = "success";
            state.apis = action.payload;
        },
        [getAuthApis.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default authApisSlice.reducer;