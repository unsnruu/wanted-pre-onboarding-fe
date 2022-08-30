import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Global, css, ThemeProvider, Theme } from "@emotion/react";

import App from "./pages/App";

import TodoProvider from "./context/TodoContext";
import AuthProvider from "./context/AuthContext";

axios.defaults.baseURL =
  "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/";
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:8000";
axios.defaults.withCredentials = false;

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
const theme: Theme = {
  color: {
    highlight: "#C7F9CC",
    primary: "#57CC99",
    secondary: "#80ED99",
    dark: "#38A3A5",
    deepDark: "#22577A",
    warning: "#E63946",
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
