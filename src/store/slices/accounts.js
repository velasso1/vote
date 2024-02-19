import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
  sendingStatus: false,
  idForDelete: null,
  dataForUpdate: null,
  hasError: false,
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

export const getAllAccs = () => {
  return (dispatch) => {
    try {
      fetch(`http://localhost:3000${process.env.REACT_APP_ALL_ACCOUNTS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("uinfo")).token
          }`,
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

export const updateUserData = (body, id) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_UPDATE_ACC_DATA}${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${
              JSON.parse(localStorage.getItem("uinfo")).token
            }`,
          },
          body: JSON.stringify(body),
        }
      ).then((resp) =>
        resp.json().then((data) => {
          dispatch(changeSendingStatus(true));
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_DELETE_ACCOUNT}${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer: ${
              JSON.parse(localStorage.getItem("uinfo")).token
            }`,
          },
        }
      ).then((resp) =>
        resp.json().then((data) => {
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const createNewUser = (body) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_CREATE_ACCOUNT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${
              JSON.parse(localStorage.getItem("uinfo")).token
            }`,
          },
          body: JSON.stringify(body),
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(accsReceived(data));
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
} = accounts.actions;

export default accounts.reducer;
