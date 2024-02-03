import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  target: "",
};

const checkbox = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    changeTarget(state, action) {
      state.target = action.payload;
    },
  },
});

export const { changeTarget } = checkbox.actions;

export default checkbox.reducer;
