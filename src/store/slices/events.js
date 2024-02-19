import { createSlice } from "@reduxjs/toolkit";

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
  },
});

// Actions

export const getEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      await fetch(`http://localhost:3000${process.env.REACT_APP_ALL_EVENTS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("uinfo")).token
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
      fetch(`http://localhost:3000${process.env.REACT_APP_CREATE_EVENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("uinfo")).token
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
  return async (dispatch, updateEvents) => {
    try {
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_DELETE_EVENT}${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("uinfo")).token
            }`,
          },
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getCurrentEvent = (id) => {
  return async (dispatch) => {
    try {
      dispatch(changeSendingStatus(true));
      await fetch(
        `http://localhost:3000${process.env.REACT_APP_CURRENT_EVENT}${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer: ${
              JSON.parse(localStorage.getItem("uinfo")).token
            }`,
          },
        }
      ).then((resp) =>
        resp.json().then((data) => dispatch(currentEventReceived(data)))
      );
      dispatch(changeSendingStatus(false));
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
} = events.actions;

export default events.reducer;
