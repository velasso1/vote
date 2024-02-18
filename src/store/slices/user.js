import { createSlice } from "@reduxjs/toolkit";

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
      state.isAuth = +localStorage.getItem("expiresIn") > new Date().getTime();
      state.isAdmin =
        localStorage.getItem("uid") === "65d1b16009ba9b4dbee1ded7";
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setAuth(state, action) {
      state.userId = action.payload.userId;
      state.isAuth = !!action.payload.token.accessToken;
      state.isAdmin = state.userId = "65d1b16009ba9b4dbee1ded7";
    },

    setStatus(state, action) {
      state.statusLoading = action.payload;
    },

    signOut(state) {
      state.login = "";
      state.isAuth = false;
      state.isAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
    },
  },
});

// Actions

export const signIn = (body) => {
  return async (dispatch) => {
    try {
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
            localStorage.setItem("uid", data.userId);
            localStorage.setItem("token", data.token.accessToken);
            localStorage.setItem(
              "expiresIn",
              new Date().getTime() + data.token.expiresIn
            );
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

export const makeChoice = (body, token) => {
  return () => {
    console.log(body);
    // try {
    //   fetch("API", {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json", "X-access-token": `${token}`},
    //     body: JSON.stringify(body),
    //   })
    // } catch (error) {
    //   console.error(error.message);
    // }
  };
};

export const checkVoiting = (id, uid) => {
  return async () => {
    console.log(JSON.stringify({ userId: `${uid}` }));
    try {
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_CHECK_VOICE}${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId: `${uid}` }),
        }
      ).then((resp) => resp.json().then((data) => console.log(data)));
    } catch (error) {
      console.error(`${error}`);
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
