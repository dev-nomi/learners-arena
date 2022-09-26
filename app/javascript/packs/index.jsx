import React from 'react'
import ReactDOM from 'react-dom'
import { Typography, Container} from '@mui/material';
import NavBar from '../components/NavBar'
import SignUp from '../components/auth/SignUp'

const App = () => {
  return(
    <>
      <NavBar />
      <Container> 
        <SignUp />
      </Container>
    </>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
