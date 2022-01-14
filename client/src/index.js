import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={user ? <App /> : <LoginPage />} />
      {/* <Route path="/Home" element={} /> */}
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>,
document.querySelector("#root"));
