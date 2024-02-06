import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user";
import events from "./slices/events";
import checkbox from "./slices/check-box";

export default configureStore({
  reducer: {
    user: user,
    events: events,
    checkbox: checkbox,
  },
});
