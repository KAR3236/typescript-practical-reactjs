import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
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
      return { ...state, data: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader, listOfBlog } = dashboardSlice.actions;

export default dashboardSlice.reducer;
