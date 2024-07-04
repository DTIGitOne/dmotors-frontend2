import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userLogged: false,
    pfp: "",
  },
  reducers: {
    setIsLogged: (state, action) => {
      state.userLogged = action.payload;
    },
    setPfp: (state, action) => {
      state.pfp = action.payload;
    },
  },
});

export const { setIsLogged , setPfp } = userSlice.actions;

export default userSlice.reducer;