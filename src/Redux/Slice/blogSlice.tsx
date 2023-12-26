import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: {},
    loader: false,
  },
  reducers: {
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
    viewBlog: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader, viewBlog } = blogSlice.actions;

export default blogSlice.reducer;
