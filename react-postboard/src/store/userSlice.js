import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const refreshAccessToken = async (tokenUrl) => {
    const res = await axios.get(tokenUrl, {withCredentials: true});
    return res.data.flag;
}

const tryLoadProfile = async (loadprofileUrl, tokenUrl, navigate, reTry) => {
    console.log("tryLoadProfile");

    const res = await axios.get(loadprofileUrl, {withCredentials: true});
    
    if(res.data.flag){
        return res.data.user;
    }

    if(reTry){
        reTry = false;
        if(await refreshAccessToken(tokenUrl)){
            console.log("Access Token Refreshed!");
            return await tryLoadProfile(loadprofileUrl, tokenUrl, navigate , reTry);
        }else{

            // toast.info("Back to Sign In Page!", {
            //     position: "top-center",
            //     autoClose: 1000,
            //     pauseOnFocusLoss:false,
            // });
            
            navigate("/");

            return {username:"",description:""};
        }
    }
}

export const getUser = createAsyncThunk(
    "user/getUser",
    async ({navigate, restApis}, thunkAPI) => {
        const loadprofileUrl = restApis.loadprofile;
        const tokenUrl = restApis.token;

        return await tryLoadProfile(loadprofileUrl, tokenUrl, navigate, true);
    }
); 
 
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {username:"",description:""},
        status: null,
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [getUser.fulfilled]: (state, action) => {
            state.status = "success";
            state.user = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default userSlice.reducer;