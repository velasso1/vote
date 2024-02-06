import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const creatingUser = createSlice({
  name: "creatingUser",
  initialState,
  reducers: {},
});

// Actions

export const createUser = (body) => {
  return () => {
    // try {
    //   fetch("URL", {
    //     method: "POST",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
    // } catch (e) {
    //   console.error(e.message);
    // }
  };
};
