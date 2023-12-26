import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loaderSlice";
import blogSlice from "./Slice/blogSlice";

export default configureStore({
  reducer: {
    loader: loaderSlice,
    blog: blogSlice,
  },
});
