import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import App from './App';
import Sidebar from './Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Sidebar />
    <App />
  </BrowserRouter>
);
