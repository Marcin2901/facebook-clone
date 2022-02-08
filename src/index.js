import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {SaveDataContextProvider} from "./hooks/Context/SaveDataContextProvider"
import {MessengerOpenContextProvider} from "./hooks/Context/MessengerOpenContextProvider";
import {ScrollToContextProvider} from "./hooks/Context/ScrollToContextProvider"

ReactDOM.render(
  <SaveDataContextProvider>
    <MessengerOpenContextProvider>
      <ScrollToContextProvider>
         <Router>
            <App />
         </Router>
        </ScrollToContextProvider>
    </MessengerOpenContextProvider>
  </SaveDataContextProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();
