import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Modal from 'react-modal'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

Modal.setAppElement('#root')
const strictMode = true

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

createRoot(document.getElementById('root')).render(
  strictMode ? <React.StrictMode>{app}</React.StrictMode> : app
)
