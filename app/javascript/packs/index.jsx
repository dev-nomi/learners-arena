import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import AllRoutes from "../routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "redux";
import allRecducers from "../reducers";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Ubuntu",
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#1A374D",
      light: "#406882",
    },
    secondary: {
      main: "#6998AB",
      contrastText: "#fff",
    },
    error: {
      main: red[400],
    },
    success: {
      main: green[400],
      contrastText: "#fff",
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" />
      <Router>
        <NavBar />
        <AllRoutes />
      </Router>
    </ThemeProvider>
  );
};
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, allRecducers);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

document.addEventListener("turbolinks:load", function () {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
