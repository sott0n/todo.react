import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoBox from './App';

ReactDOM.render(
  <React.StrictMode>
    <TodoBox />
  </React.StrictMode>,
  document.getElementById('todoBox')
);
