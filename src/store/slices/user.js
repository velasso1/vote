import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  token: null,
  isAuth: false,
  isAdmin: true,
  userData: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
      state.isAuth = action.payload.login && action.payload.password;
    },

    removeUser(state) {
      state.login = null;
      state.isAuth = false;
    },

    userToEdit(state, action) {
      state.userData = action.payload;
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

export const createNewUser = (body) => {
  return () => {
    // try {
    //   fetch("API", {
    //     method: "POST",
    //     headers: { "Contnet-Type": "appliction/json" },
    //     body: JSON.stringify(body),
    //   });
    // } catch (err) {
    //   console.error(err.message);
    // }
  };
};

// add token here
export const deleteUser = (id) => {
  return () => {
    console.log(id);
    // try {
    //   fetch("API/:id", {
    //     method: "DELETE",
    //     headers: {
    //       "X-access-token": `${token}`
    //     }
    //   })
    // } catch (error) {
    //   console.error(error.message);
    // }
  };
};

// add => body, token here
export const updateUserData = (body) => {
  return () => {
    console.log(body);
    // try {
    //   fetch("API/:id", {
    //     method: "PUT",
    //     headers: {"Content-Type": "application/json", "X-access-token": `${token}`},
    //     body: JSON.stringify(body)
    //   })
    // } catch (error) {
    //   console.error(error.message);
    // }
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

export const { setUser, removeUser, userToEdit } = user.actions;

export default user.reducer;
