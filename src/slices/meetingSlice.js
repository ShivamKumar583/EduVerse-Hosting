import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionData: localStorage.getItem("sessionData") ? JSON.parse(localStorage.getItem("sessionData")) : null,

};

const meetingSlice = createSlice({
  name: "meeting",
  initialState: initialState,
  reducers: {
    setSessionData(state, value) {
      state.sessionData = value.payload;
    },
    

  },
});

export const { setSessionData } = meetingSlice.actions;

export default meetingSlice.reducer;