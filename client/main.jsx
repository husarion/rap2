import './all.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SocketManager } from './components/SocketManager';

// Todo fix wrapping all in socket manager
ReactDOM.render(
  <SocketManager>
    <App />
  </SocketManager>,
  document.getElementById('react-target-div'),
);