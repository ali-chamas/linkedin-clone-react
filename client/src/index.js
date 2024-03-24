import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserContextProvider from "./context/UserContext";
import Profile from "./pages/profile";
import Jobs from "./pages/jobs";
import Following from "./pages/following";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout children={<App />} />} />
          <Route path="/profile" element={<Layout children={<Profile />} />} />
          <Route path="/jobs" element={<Layout children={<Jobs />} />} />
          <Route
            path="/following"
            element={<Layout children={<Following />} />}
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
