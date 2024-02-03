import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const events = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

export default events.reducer;
