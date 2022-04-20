import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { utilActions } from './utilSlice';
import $ from 'jquery';





const refreshAccessToken = async (tokenUrl) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}

const tryPostPagination = async (thunkAPI, navigate, postUrl, tokenUrl, reTry) => {

    const page = thunkAPI.getState().util.selectedPage;
    const fromDate = thunkAPI.getState().util.fromDate;
    const toDate = thunkAPI.getState().util.toDate;
    

    console.log("tryPostPagination",page);

    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();

    const res = await axios.get(postUrl + `?from=` + from + `&to=` + to + `&page=` +page, {withCredentials: true});

    if(res.data.flag){
        // console.log(res.data.pages,page);

        let withoutContentPage = false;

        if(res.data.pages < page && res.data.pages > 0){
            withoutContentPage = true;
        }
        let pages = [];
        for(let i=0;i<res.data.pages;++i){
            pages.push(i+1);
        }
        thunkAPI.dispatch(utilActions.setPages(pages));

        if(withoutContentPage){
            const lastPage = pages.at(-1);
            thunkAPI.dispatch(utilActions.setSelectedPage(lastPage));
            $("#pageSelectorId").val(lastPage);

            return await tryPostPagination(thunkAPI, navigate, postUrl, tokenUrl, true);
        }

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
            //     autoClose: 1000,
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