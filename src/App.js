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
          element={<PrivateRoute children={<CreateEventPage/>}/>}/>

        <Route 
          path="/create-user" 
          element={<PrivateRoute children={<CreateUserPage/>}/>}/>
      </Routes>
    </>
  );
}

export default App;
