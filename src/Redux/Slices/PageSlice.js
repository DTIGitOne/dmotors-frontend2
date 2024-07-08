import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "pages",
  initialState: {
    page: 1,
    resultLoading: false,
  },
  reducers: {
   setPageNumber: (state, action) => {
      return {
         ...state,
         page: action.payload,
      };
   },
   setResultLoading: (state, action) => {
      return {
         ...state,
         resultLoading: action.payload,
      };
   },
  },
});

export const { setPageNumber, setResultLoading } = PageSlice.actions;

export default PageSlice.reducer;