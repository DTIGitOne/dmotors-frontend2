import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./Slices/carDataSlice";
import userSlice from "./Slices/User"
import reviewSlice from "./Slices/Reviews"
import MessageExpandedSlice from "./Slices/MessageExpandedSlice";
import PageSlice from "./Slices/PageSlice";

const store = configureStore({
   reducer: {
      pages: PageSlice,
      cardata: carDataSlice,
      user: userSlice,
      review: reviewSlice,
      messageopen: MessageExpandedSlice,
   }
});

export default store;