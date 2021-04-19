import './all.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SocketManager } from './components/SocketManager';

ReactDOM.render(
  <SocketManager>
    <App />
  </SocketManager>,
  document.getElementById('react-target-div'),
);

// function showLoader() {
//   console.log("Loading...");
// }

// showLoader();
