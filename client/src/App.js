import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./scss/style.scss";

import Header from "./components/ui/header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/authroized" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
