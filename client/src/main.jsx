import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  //for redux to work it is essential to wrap the main.jsx where app.jsx is running with the provider element
  <Provider store={store}>
    <App />
  </Provider>
);
