import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
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
import ChatBot from "react-simple-chatbot";
import { ThemeProvider as BotTheme } from "styled-components";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.auth.user);

  const botTheme = {
    background: "#f5f8fb",
    fontFamily: "Ubuntu",
    headerBgColor: "#6998AB",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#6998AB",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" />
      <Router>
        <NavBar />
        <AllRoutes />
        {user?.role == "student" && (
          <BotTheme theme={botTheme}>
            <ChatBot
              steps={[
                {
                  id: "0",
                  message: `Welcome, ${user?.first_name} to learners arena chatbot!`,
                  trigger: "1",
                },
                {
                  id: "1",
                  options: [
                    { value: 1, label: "Feedback?", trigger: "2" },
                    { value: 2, label: "Complain?", trigger: "3" },
                    { value: 3, label: "Query?", trigger: "4" },
                  ],
                },
                {
                  id: "2",
                  message: "This is feedback content",
                  trigger: "5",
                },
                {
                  id: "3",
                  message: "This is complain content",
                  trigger: "5",
                },
                {
                  id: "4",
                  message: "This is query content",
                  trigger: "5",
                },
                {
                  id: "5",
                  message: "Bye!",
                  end: true,
                },
              ]}
              floating="true"
            />
          </BotTheme>
        )}
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

document.addEventListener("turbolinks:load", function() {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
