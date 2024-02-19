import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs-react";

const initialState = {
  login: null,
  userId: null,
  isAuth: false,
  isAdmin: false,
  error: "",
  statusLoading: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
    },

    checkExpiresToken(state) {
      const { role, uid, token, expiration } =
        JSON.parse(localStorage.getItem("uinfo")) || "null";
      state.isAuth = expiration > new Date().getTime();
      state.isAdmin = role === "admin";
      state.userId = uid;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setAuth(state, action) {
      console.log(action.payload);
      const { userId, token, role } = action.payload;
      console.log(role);
      console.log(token.accessToken);
      state.userId = userId;
      state.isAuth = !!token.accessToken;
      state.isAdmin = role === "admin";

      localStorage.setItem(
        "uinfo",
        JSON.stringify({
          uid: userId,
          token: token.accessToken,
          expiration: new Date().getTime() + token.expiresIn,
          role: role,
        })
      );
    },

    setStatus(state, action) {
      state.statusLoading = action.payload;
    },

    signOut(state) {
      state.login = "";
      state.isAuth = false;
      state.isAdmin = false;
      localStorage.removeItem("uinfo");
    },
  },
});

// Actions

export const signIn = (body) => {
  return async (dispatch) => {
    try {
      console.log(body);
      dispatch(setStatus(true));
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_SIGN_IN_ROUTE}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).then((resp) =>
        resp.json().then((data) => {
          if (data.token) {
            dispatch(setAuth(data));
          }
          dispatch(setError(data.error));
          dispatch(setStatus(false));
        })
      );
    } catch (err) {
      console.error(`${err}`);
    }
  };
};

export const makeChoice = (body) => {
  return async () => {
    console.log(body);
    try {
      await fetch(`http://localhost:3000${process.env.REACT_APP_MAKE_CHOICE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${
            JSON.parse(localStorage.getItem("uinfo")).token
          }`,
        },
        body: JSON.stringify(body),
      }).then((resp) => resp.json().then((data) => console.log(data)));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const checkVoiting = (id, uid) => {
  return async () => {
    try {
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_CHECK_VOICE}${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${
              JSON.parse(localStorage.getItem("uinfo")).token
            }`,
          },
          body: JSON.stringify({ userId: uid }),
        }
      ).then((resp) => resp.json().then((data) => console.log(data)));
    } catch (error) {
      console.log(`${error}`);
    }
  };
};

export const {
  setUser,
  removeUser,
  checkExpiresToken,
  setError,
  setAuth,
  signOut,
  setStatus,
} = user.actions;

export default user.reducer;
