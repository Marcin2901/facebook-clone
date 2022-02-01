import React, { useState } from "react";
import './App.css';
import {Link, Switch, Route} from "react-router-dom";
import LoginSection from "./Page/LoginSection/LoginSection";


function App() {

  // const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="app">
      
           <Switch>
              <Route exact path="/">
                    <LoginSection />
              </Route>
              <Route path="/resetPassword">
                    {/* <ResetPasswordSection /> */}
              </Route>

           </Switch>
           
        
    </div>
  );
}

export default App;
