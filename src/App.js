import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/private-route";

import "./scss/style.scss";

import Header from "./components/ui/header";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import CurrentPage from "./pages/current-page";
import CreateEventPage from "./pages/create-event-page";
import CreateUserPage from "./pages/create-user-page";
import ManageUsersPage from "./pages/manage-users-page";
import EditUserPage from "./pages/edit-user-page";
import EditEventPage from "./pages/edit-event-page";
import PrintPage from "./pages/print-page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route
          path="/events"
          element={<PrivateRoute children={<HomePage />} />}
        />
        <Route
          path="/events/current-event/:id"
          element={<PrivateRoute children={<CurrentPage />} />}
        />
        <Route
          path="/create-event"
          element={<PrivateRoute children={<CreateEventPage />} />}
        />

        <Route
          path="/create-user"
          element={<PrivateRoute children={<CreateUserPage />} />}
        />

        <Route
          path="/manage"
          element={<PrivateRoute children={<ManageUsersPage />} />}
        />

        <Route
          path="/edit-user/:id"
          element={<PrivateRoute children={<EditUserPage />} />}
        />

        <Route
          path="/edit-event/:id"
          element={<PrivateRoute children={<EditEventPage />} />}
        />

        <Route
          path="/print-result/:id"
          element={<PrivateRoute children={<PrintPage />} />}
        />
      </Routes>
    </>
  );
}

export default App;
