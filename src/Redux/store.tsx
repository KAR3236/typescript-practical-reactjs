import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loaderSlice";
import dashboardSlice from "./Slice/dashboardSlice";
import blogSlice from "./Slice/blogSlice";

export default configureStore({
  reducer: {
    loader: loaderSlice,
    dashboard: dashboardSlice,
    blog: blogSlice,
  },
});
