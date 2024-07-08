import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
  },
  reducers: {
   setReviews: (state, action) => {
      return {
         ...state,
         reviews: action.payload,
      };
   },
  },
});

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;