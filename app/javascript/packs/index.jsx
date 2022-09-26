import React from 'react'
import ReactDOM from 'react-dom'
import { Typography } from '@mui/material';

const App = props => (
  <>
    <Typography variant="h1" component="h1" mt={2}>
      Hello from react!
    </Typography>
  </>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
