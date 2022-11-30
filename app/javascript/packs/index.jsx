import React, { useEffect, useState } from "react";
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
import axios from "axios";

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

  const SendResponse = (data) => {
    const response = new FormData();
    response.append("response[title]", data.previousStep.message);
    response.append("response[resp_type]", data.type);

    axios
      .post("/api/v1/responses", response)
      .then((response) => {})
      .catch((error) => {});

    if (data.type === "feedback") {
      return "🎊 Thankyou submiting the feedback.";
    } else if (data.type === "complain") {
      return "Sorry, to hear about it soon we will respond you.";
    } else if (data.type === "query") {
      return "Will get back to you.";
    }
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
                  message: "Kindly write your feedback?",
                  trigger: "5",
                },
                {
                  id: "3",
                  options: [
                    { value: 1, label: "Assignment?", trigger: "11" },
                    { value: 2, label: "Content?", trigger: "11" },
                    { value: 3, label: "Application?", trigger: "11" },
                  ],
                },
                {
                  id: "11",
                  message: "Kindly write your complain?",
                  trigger: "6",
                },
                {
                  id: "4",
                  message: "Kindly write your query?",
                  trigger: "7",
                },
                {
                  id: "5",
                  user: true,
                  trigger: "8",
                },
                {
                  id: "6",
                  user: true,
                  trigger: "9",
                },
                {
                  id: "7",
                  user: true,
                  trigger: "10",
                },
                {
                  id: "8",
                  component: <SendResponse value={`previousValue`} type="feedback" />,
                  end: true,
                },
                {
                  id: "9",
                  component: <SendResponse value={`previousValue`} type="complain" />,
                  end: true,
                },
                {
                  id: "10",
                  component: <SendResponse value={`previousValue`} type="query" />,
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
