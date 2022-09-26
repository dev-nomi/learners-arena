import React from 'react'
import ReactDOM from 'react-dom'
import { Typography, Container} from '@mui/material';
import NavBar from '../components/NavBar'

const App = () => {
  return(
    <>
      <NavBar />
      <Container> 
        <Typography variant="h3" component="h3" mt={2}>
          Hello from react!
        </Typography>
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
