import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from '../components/NavBar'
import routes from '../components/routes/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return(
    <>
      <ToastContainer 
        theme = 'colored'
      />
      <Router>
        <NavBar />
        <Routes>
          {routes}
        </Routes>
      </Router>
    </>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
