import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { utilActions } from './utilSlice';


const refreshAccessToken = async (tokenUrl) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}

const tryPostPagination = async (thunkAPI, navigate, postUrl, tokenUrl, reTry) => {

    const page = thunkAPI.getState().util.selectedPage;
    const fromDate = thunkAPI.getState().util.fromDate;
    const toDate = thunkAPI.getState().util.toDate;

    console.log("tryPostPagination");

    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();

    const query = new URLSearchParams();
    query.append('from', from);
    query.append('to', to);
    query.append('page', page);

    const res = await axios.get(postUrl + `?from=` + from + `&to=` + to + `&page=` +page, {withCredentials: true});

    if(res.data.flag){
        let pages = [];
        for(let i=0;i<res.data.pages;++i){
            pages.push(i+1);
        }
        thunkAPI.dispatch(utilActions.setPages(pages));

        return res.data.posts;
    }

    if(reTry){
        reTry = false;
        if(await refreshAccessToken(tokenUrl)){
            console.log("Access Token Refreshed!");
            return await tryPostPagination(thunkAPI, navigate, postUrl, tokenUrl, reTry);
        }else{
            // toast.info("Back to Sign In Page!", {
            //     position: "top-center",
            //     autoClose: 2000,
            //     pauseOnFocusLoss:false,
            // });
            
            navigate("/");

            return [];
        }
    }
}

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async ({navigate, restApis}, thunkAPI) => {
        const postUrl = restApis.post;
        const tokenUrl = restApis.token;

        return await tryPostPagination(thunkAPI, navigate, postUrl, tokenUrl, true);
    }
); 
  
const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: null,
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = "loading";
        },
        [getPosts.fulfilled]: (state, action) => {
            state.status = "success";
            state.posts = action.payload;
        },
        [getPosts.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default postsSlice.reducer;