import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    datas: [],
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
    listOfBlog: (state, action) => {
      return { ...state, datas: action.payload };
    },
    viewBlog: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader, listOfBlog, viewBlog } = blogSlice.actions;

export default blogSlice.reducer;
