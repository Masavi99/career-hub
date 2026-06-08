import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/jobs.css";
import App from "./App";


import "./styles/global.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/login.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);