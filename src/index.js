import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from "@/stores/User"

User.create();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
