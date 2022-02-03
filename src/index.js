import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {SaveDataContextProvider} from "./hooks/Context/SaveDataContextProvider"

ReactDOM.render(
  <SaveDataContextProvider>
    <Router>
        <App />
    </Router>
  </SaveDataContextProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();
