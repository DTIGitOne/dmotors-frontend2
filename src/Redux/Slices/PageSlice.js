import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "pages",
  initialState: {
    page: 1,
    resultLoading: false,
  },
  reducers: {
   setPageNumber: (state, action) => {
      // Use the payload directly as it should be an array of cars
      return {
         ...state,
         page: action.payload,
      };
   },
   setResultLoading: (state, action) => {
      // Use the payload directly as it should be an array of cars
      return {
         ...state,
         resultLoading: action.payload,
      };
   },
  },
});

export const { setPageNumber, setResultLoading } = PageSlice.actions;

export default PageSlice.reducer;