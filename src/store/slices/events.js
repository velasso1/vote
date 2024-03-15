import { createSlice } from "@reduxjs/toolkit";
import { checkExpiresToken } from "./user";
import crypto from "crypto-js";

const initialState = {
  events: [],
  currentEvent: [],
  idForDelete: null,
  sendingStatus: false,
};

const events = createSlice({
  name: "events",
  initialState,
  reducers: {
    eventsReceived(state, action) {
      state.events = action.payload;
    },

    setIdForDelete(state, action) {
      state.idForDelete = action.payload;
    },

    eventsFilter(state) {
      state.events = state.events.filter(
        (item) => item._id !== state.idForDelete
      );
      state.idForDelete = null;
    },

    changeSendingStatus(state, action) {
      state.sendingStatus = action.payload;
    },

    currentEventReceived(state, action) {
      state.currentEvent = action.payload;
    },

    updateEvents(state, action) {
      state.events = [
        ...state.events.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      ];
    },
  },
});

// Actions

export const getEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_ALL_EVENTS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(
              crypto.Rabbit.decrypt(
                localStorage.getItem("uinfo"),
                `${process.env.REACT_APP_PASS_KEY}`
              ).toString(crypto.enc.Utf8)
            ).token
          }`,
        },
      }).then((resp) => {
        resp.json().then((data) => {
          dispatch(eventsReceived(data));
          dispatch(changeSendingStatus(false));
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const createEvent = (body) => {
  return (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      fetch(`${process.env.REACT_APP_CREATE_EVENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(
              crypto.Rabbit.decrypt(
                localStorage.getItem("uinfo"),
                `${process.env.REACT_APP_PASS_KEY}`
              ).toString(crypto.enc.Utf8)
            ).token
          }`,
        },
        body: JSON.stringify(body),
      });
      dispatch(changeSendingStatus(false));
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_DELETE_EVENT}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(
              crypto.Rabbit.decrypt(
                localStorage.getItem("uinfo"),
                `${process.env.REACT_APP_PASS_KEY}`
              ).toString(crypto.enc.Utf8)
            ).token
          }`,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const updateEvent = (body, id) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_UPDATE_EVENT}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${
            JSON.parse(
              crypto.Rabbit.decrypt(
                localStorage.getItem("uinfo"),
                `${process.env.REACT_APP_PASS_KEY}`
              ).toString(crypto.enc.Utf8)
            ).token
          }`,
        },
        body: JSON.stringify(body),
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(updateEvents(data));
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(`${error}`);
    }
  };
};

export const getCurrentEvent = (id) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      dispatch(checkExpiresToken());
      await fetch(`${process.env.REACT_APP_CURRENT_EVENT}${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer: ${
            JSON.parse(
              crypto.Rabbit.decrypt(
                localStorage.getItem("uinfo"),
                `${process.env.REACT_APP_PASS_KEY}`
              ).toString(crypto.enc.Utf8)
            ).token
          }`,
        },
      }).then((resp) =>
        resp.json().then((data) => {
          dispatch(currentEventReceived(data));
          dispatch(changeSendingStatus(false));
        })
      );
    } catch (error) {
      console.error(`${error}`);
    }
  };
};

export const {
  eventsReceived,
  setIdForDelete,
  eventsFilter,
  changeSendingStatus,
  currentEventReceived,
  updateEvents,
} = events.actions;

export default events.reducer;
