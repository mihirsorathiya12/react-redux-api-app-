import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPostsAPI,
  addPostAPI,
  updatePostAPI,
  deletePostAPI,
} from "./postAPI";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetchPostsAPI();
  return res.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const res = await addPostAPI(newPost);
  return { ...newPost, id: Math.random() };
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    await updatePostAPI(updatedPost);
    return updatedPost;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await deletePostAPI(postId);
    return postId;
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        if (!Array.isArray(state.posts)) state.posts = [];
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
