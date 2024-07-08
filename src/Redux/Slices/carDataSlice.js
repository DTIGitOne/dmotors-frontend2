import { createSlice } from "@reduxjs/toolkit";

const carDataSlice = createSlice({
   name: "cardata",
   initialState: {
      cars: [], 
   },
   reducers: {
      setCars: (state, action) => {
         return {
            ...state,
            cars: action.payload,
         };
      },
      clearCars: (state) => {
         return {
           ...state,
           cars: [],
         };
      },
   },
});

export const { setCars, clearCars } = carDataSlice.actions;

export default carDataSlice.reducer;
