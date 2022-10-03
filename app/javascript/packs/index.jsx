import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import routes from "../routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "redux";
import allRecducers from "../reducers";
import { Provider } from "react-redux";
import createRoutes from "../routes/index";
const App = () => {
  return (
    <>
      <ToastContainer theme="colored" />
      <Router>
        <NavBar />
        <Routes>{routes}</Routes>
      </Router>
    </>
  );
};

const store = createStore(
  allRecducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
