import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loader: false,
  },
  reducers: {
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } =
  loaderSlice.actions;

export default loaderSlice.reducer;
