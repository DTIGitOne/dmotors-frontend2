import { createSlice } from "@reduxjs/toolkit";

const MessageExpandedSlice = createSlice({
  name: "messageopen",
  initialState: {
    expanded: false,
    contentVisible: false,
    closing: false,
    openMessages: false,
  },
  reducers: {
    setExpanded: (state, action) => {
      state.expanded = action.payload;
    },
    setVisible: (state, action) => {
      state.contentVisible = action.payload;
    },
    setClosing: (state, action) => {
      state.closing = action.payload;
    },
    setOpenMessages: (state, action) => {
      state.openMessages = action.payload;
    },
  },
});

export const { setExpanded , setVisible , setClosing , setOpenMessages } = MessageExpandedSlice.actions;

export default MessageExpandedSlice.reducer;