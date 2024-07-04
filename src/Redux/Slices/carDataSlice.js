import { createSlice } from "@reduxjs/toolkit";

const carDataSlice = createSlice({
   name: "cardata",
   initialState: {
      cars: [], // Store cars as an array
   },
   reducers: {
      setCars: (state, action) => {
         // Use the payload directly as it should be an array of cars
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
