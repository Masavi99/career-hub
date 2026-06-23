import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/dashboard.css";
import "./styles/resume.css"
import "./styles/jobs.css";
import "./styles/settings.css"
import App from "./App";
import "./styles/ai-tools.css"

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/login.css";
import "./styles/interview.css";
import "./styles/job-search.css";
import "./styles/contacts.css";

import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
  <AppProvider>
    <App/>
  </AppProvider>
   
  </BrowserRouter>
);