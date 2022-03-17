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

// to co na kartce + ustawic scrollY na 0 przy przeładowaniu strony + weather app, duży messenger i prototypy
// wszystkich rzeczy z listy po lewej, możeliwość dodawania znajomych i segregacja postów po dacie na 
//profilu i na głównej tablicy
