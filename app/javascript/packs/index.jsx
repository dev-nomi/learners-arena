import React from 'react'
import ReactDOM from 'react-dom'

const App = props => (
  <div>Hello from react!</div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
