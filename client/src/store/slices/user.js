import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  token: null,
  isAuth: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
      state.isAuth = !!action.payload.token;
    },

    removeUser(state) {
      state.login = null;
      state.isAuth = false;
    },
  },
});

// Actions

export const signIn = (body) => {
  return () => {
    // console.log(body);
    // try {
    //   fetch("PUT ADDRESS HERE", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
    // } catch (e) {
    //   console.error(e.message);
    // }
  };
};

export const { setUser, removeUser } = user.actions;

export default user.reducer;
