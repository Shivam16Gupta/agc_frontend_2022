import 'assets/css/material-dashboard-react.css?v=1.8.0'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'regenerator-runtime/runtime'
import App from './layouts/App'
import Store from './store'

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
