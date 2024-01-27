import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/private-route";

import "./scss/style.scss";

import Header from "./components/ui/header";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import AdminPage from "./pages/admin-page";
import CurrentPage from "./pages/current-page";

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
        <Route path="/admin-page" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
