import { createSlice } from "@reduxjs/toolkit";
import { checkExpiresToken } from "./user";
import crypto from "crypto-js";

const initialState = {
  accounts: [],
  sendingStatus: false,
  idForDelete: null,
  dataForUpdate: null,
};

const accounts = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    accsReceived(state, action) {
      state.accounts = action.payload;
    },
    changeSendingStatus(state, action) {
      state.sendingStatus = action.payload;
    },

    accountsFilter(state) {
      state.accounts = state.accounts.filter(
        (item) => item._id !== state.idForDelete
      );
      state.idForDelete = null;
    },

    userToEdit(state, action) {
      state.dataForUpdate = action.payload;
    },

    getIdForDelete(state, action) {
      state.idForDelete = action.payload;
    },
  },
});

// Actions

export const getAllAccs = (decryptedUInfo) => {
  console.log(decryptedUInfo, "REDUX");
  return (dispatch) => {
    try {
      dispatch(checkExpiresToken());
      fetch(`${process.env.REACT_APP_ALL_ACCOUNTS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${decryptedUInfo.token}`,
        },
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(accsReceived(data));
        })
      );
    } catch (error) {
      console.error(`${error}`);
    }
  };
};

export const updateUserData = (body, id, decryptedUInfo) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_UPDATE_ACC_DATA}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${decryptedUInfo.token}`,
        },
        body: JSON.stringify(body),
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const deleteUser = (id, decryptedUInfo) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_DELETE_ACCOUNT}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer: ${decryptedUInfo.token}`,
        },
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const createNewUser = (body, decryptedUInfo) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_CREATE_ACCOUNT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${decryptedUInfo.token}`,
        },
        body: JSON.stringify(body),
      })
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(getAllAccs());
          dispatch(changeSendingStatus(false));
        });
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const {
  accsReceived,
  changeSendingStatus,
  userToEdit,
  accountsFilter,
  getIdForDelete,
  addNewAccount,
} = accounts.actions;

export default accounts.reducer;
