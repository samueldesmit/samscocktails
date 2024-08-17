import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import CustomProvider from "./context/AuthContext";

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CustomProvider>
        <App />
      </CustomProvider>
    </Router>
  </React.StrictMode>,
)
