import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from '../components/NavBar'
import routes from '../components/routes/index'

const App = () => {
  return(
    <>
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
