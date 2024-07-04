import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
  },
  reducers: {
   setReviews: (state, action) => {
      // Use the payload directly as it should be an array of cars
      return {
         ...state,
         reviews: action.payload,
      };
   },
  },
});

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;