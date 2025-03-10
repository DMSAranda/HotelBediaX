import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { HotelApp } from './HotelApp.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HotelApp />
    </BrowserRouter>
  </React.StrictMode>,
)
