import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import './index.css'
import { SocketContextProvider } from './hooks/socketContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
 
  <SocketContextProvider>
    
    <App />
  </SocketContextProvider>
 
)
