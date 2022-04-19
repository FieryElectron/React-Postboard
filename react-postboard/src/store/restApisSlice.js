import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUser } from './userSlice';
import { getPosts } from './postsSlice';


export const getRestApis = createAsyncThunk(
    "restApis/getRestApis",
    async (navigate, thunkAPI) => {

        const restApis = await fetch(`http://` + process.env.REACT_APP_ROOT_DOMAIN + `:` + process.env.REACT_APP_REST_PORT + `/api/`).then((res) => res.json());

        thunkAPI.dispatch(getUser({navigate, restApis}));
        thunkAPI.dispatch(getPosts({navigate, restApis}));

        return restApis;
    }
);



const restApisSlice = createSlice({
    name: "restApis",
    initialState: {
        apis: {},
        status: null,
    },
    extraReducers: {
        [getRestApis.pending]: (state, action) => {
            state.status = "loading";
        },
        [getRestApis.fulfilled]: (state, action) => {
            state.status = "success";
            state.apis = action.payload;
        },
        [getRestApis.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default restApisSlice.reducer;