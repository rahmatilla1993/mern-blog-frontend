import { configureStore } from "@reduxjs/toolkit";
import { postReducer, authReducer } from "./slices";

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
