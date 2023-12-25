import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loaderSlice";

export default configureStore({
  reducer: {
    loader: loaderSlice,
  },
});
