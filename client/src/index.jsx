import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import MainContext from "./context/MainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainContext>
        <App />
      </MainContext>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
