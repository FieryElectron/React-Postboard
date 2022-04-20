import { createSlice } from "@reduxjs/toolkit";

import { getPosts } from "./postsSlice";

import { useDispatch } from "react";
import { useNavigate } from 'react-router-dom';

const utilSlice = createSlice({
    name: 'util',
    initialState: {
        username: '',
        password: '',
        selectedPage: 1,
        fromDate: '',
        toDate: '',
        pages:[1,2,3,4,5],
        postContent: '',
    },
    reducers: {
        setUsername(state, action){
            state.username = action.payload;
        },
        setPassword(state, action){
            state.password = action.payload;
        },
        setSelectedPage(state, action){
            state.selectedPage = action.payload;
        },
        setFromDate(state, action){
            state.fromDate = action.payload;
        },
        setToDate(state, action){
            state.toDate = action.payload;
        },
        setPages(state, action){
            state.pages = action.payload;
        },
        setPostContent(state, action){
            state.postContent = action.payload;
        },
    }
})

export const utilActions = utilSlice.actions;
export default utilSlice.reducer;