import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Global, css } from "@emotion/react";

import App from "./pages/App";
import NotFound from "./pages/404";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";

import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", sans-serif;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route index element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
