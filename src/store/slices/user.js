import { createSlice } from "@reduxjs/toolkit";
import { changeSendingStatus } from "./events";
import crypto from "crypto-js";

const initialState = {
  login: null,
  userId: null,
  isAuth: false,
  isAdmin: false,
  error: "",
  statusLoading: false,
  isVoted: false,
  tokenIsValid: false,
  confirmDeleting: false,
  decryptedUInfo: "null",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
    },

    checkAuth(state) {
      const { role, uid } = state.decryptedUInfo || "null";
      state.isAuth = state.tokenIsValid;
      state.isAdmin = role === "admin";
      state.userId = uid;
    },

    checkExpiresToken(state) {
      if (localStorage.getItem("uinfo")) {
        state.decryptedUInfo = JSON.parse(
          crypto.Rabbit.decrypt(
            localStorage.getItem("uinfo"),
            `${process.env.REACT_APP_PASS_KEY}`
          ).toString(crypto.enc.Utf8)
        );
      }

      const { expiration } = state.decryptedUInfo || "null";
      state.tokenIsValid = expiration > new Date().getTime();
      if (!state.tokenIsValid) {
        renewalToken(state.decryptedUInfo);
      }
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setVoted(state, action) {
      if (Array.isArray(action.payload)) {
        const { accepted, denied } = action.payload[0] || "null";
        state.isVoted = accepted || denied;
        return;
      }
      const { accepted, denied } = action.payload.voice;
      state.isVoted = accepted || denied;
    },

    setAuth(state, action) {
      const { userId, token, role } = action.payload;
      state.userId = userId;
      state.isAuth = !!token.accessToken;
      state.isAdmin = role === "admin";

      localStorage.setItem(
        "uinfo",
        crypto.Rabbit.encrypt(
          JSON.stringify({
            uid: userId,
            token: token.accessToken,
            refTok: token.refreshToken,
            expiration: new Date().getTime() + token.expiresIn,
            role: role,
          }),
          `${process.env.REACT_APP_PASS_KEY}`
        )
      );

      state.decryptedUInfo = JSON.parse(
        crypto.Rabbit.decrypt(
          localStorage.getItem("uinfo"),
          `${process.env.REACT_APP_PASS_KEY}`
        ).toString(crypto.enc.Utf8)
      );
    },

    setStatus(state, action) {
      state.statusLoading = action.payload;
    },

    signOut(state) {
      state.login = "";
      state.isAuth = false;
      state.isAdmin = false;
      state.tokenIsValid = false;
      localStorage.removeItem("uinfo");
      state.decryptedUInfo = "null";
    },

    setConfirmDeleting(state, action) {
      state.confirmDeleting = action.payload;
    },
  },
});

// Actions

export const signIn = (body) => {
  return async (dispatch) => {
    try {
      dispatch(setStatus(true));
      await fetch(`${process.env.REACT_APP_SIGN_IN_ROUTE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((resp) =>
        resp.json().then((data) => {
          if (data.token) {
            dispatch(setAuth(data));
            dispatch(checkExpiresToken());
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

export const makeChoice = (body, decryptedUInfo) => {
  return async (dispatch) => {
    try {
      dispatch(checkExpiresToken());
      dispatch(changeSendingStatus(true));

      await fetch(`${process.env.REACT_APP_MAKE_CHOICE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${decryptedUInfo.token}`,
        },
        body: JSON.stringify(body),
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(setVoted(data));
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const checkVoiting = (id, uid, decryptedUInfo) => {
  return async (dispatch) => {
    try {
      dispatch(checkExpiresToken());
      dispatch(changeSendingStatus(true));
      await fetch(`${process.env.REACT_APP_CHECK_VOICE}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${decryptedUInfo.token}`,
        },
        body: JSON.stringify({ userId: uid }),
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(setVoted(data));
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(`${error}`);
    }
  };
};

export const renewalToken = (decryptedUInfo) => {
  return async (dispatch, state) => {
    await fetch(`${process.env.REACT_APP_RENEWAL_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      payload: JSON.stringify({
        refreshToken: `${decryptedUInfo.refTok}`,
      }),
    }).then((resp) =>
      resp.json().then((data) => {
        dispatch(setAuth(data));
        dispatch(checkExpiresToken());
      })
    );
  };
};

export const {
  setUser,
  removeUser,
  checkAuth,
  checkExpiresToken,
  setError,
  setAuth,
  signOut,
  setStatus,
  setVoted,
  setConfirmDeleting,
} = user.actions;

export default user.reducer;
