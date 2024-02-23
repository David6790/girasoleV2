import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./APP/store";
import Modal from "react-modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
Modal.setAppElement("#root");
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
