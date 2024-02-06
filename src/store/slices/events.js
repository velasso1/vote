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

export const createEvent = (body, token) => {
  return () => {
    console.log(body);
    // try {
    //   fetch("API", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-access-token": `${token}`
    //     },
    //     body: JSON.stringify(body),
    //   })
    // } catch (error) {
    //    console.error(error.message);
    // }
  }
}

export const deleteEvent = (id) => {
  return () => {
    console.log(id);
    // try {
    //   fetch(`API:/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-access-token": `${token}`
    //     },
    //   });
    // } catch (error) {
    //    console.error(error.message);
    // }
  };
};

export default events.reducer;
