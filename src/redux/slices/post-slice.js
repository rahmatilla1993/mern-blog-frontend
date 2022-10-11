import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/post");
  return data;
});

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/post/${id}`);
    return data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
        state.posts.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.status = "success";
        state.posts.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = "error";
        state.posts.items = [];
      })

      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
        state.tags.items = [];
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.status = "success";
        state.tags.items = action.payload;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = "error";
        state.tags.items = [];
      })

      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.status = "success";
        state.posts.items = state.posts.items.filter(
          (item) => item._id !== action.meta.arg
        );
      })

      .addDefaultCase(() => {});
  },
});

const { reducer } = postSlice;

export default reducer;
