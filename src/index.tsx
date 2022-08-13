import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Global, css } from "@emotion/react";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const globalStyles = css`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Global styles={globalStyles} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
