import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ProfilePage from "./pages/ProfilePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>,
document.querySelector("#root"));
