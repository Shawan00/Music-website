import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
