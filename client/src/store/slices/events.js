import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const events = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

// Actions

export const deleteEvent = (id) => {
  return () => {
    console.log(id);
    // try {
    //   fetch(`API:/${id}`, {
    //     method: "DELETE",
    //   });
    // } catch (error) {
    //   console.error(error.message);
    // }
  };
};

export default events.reducer;
