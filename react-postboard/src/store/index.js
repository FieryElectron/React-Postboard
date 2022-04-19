import { configureStore } from "@reduxjs/toolkit";
import utilReducer from "./utilSlice";
import authApisReducer from "./authApisSlice";
import restApisReducer from "./restApisSlice";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";

const store = configureStore({
    reducer: {
        authApis: authApisReducer,
        restApis: restApisReducer,
        util: utilReducer,
        user: userReducer,
        posts: postsReducer,
    }
})

export default store;