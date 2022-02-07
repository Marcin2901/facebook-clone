import React, { useContext } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import LoginSection from "./Page/LoginSection/LoginSection";
import Board from "./Page/Board/Board";
import RegistrationForm from "./Page/RegistrationForm/RegistrationFrom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FormDataContextProvider } from "./hooks/Context/FormDataContextProvider";
import { UserContextProvider } from "./hooks/Context/UserContextProvider";
import ResetPasswordSection from "./Page/ResetPassword/ResetPasswordSection";
import MessengerComponent from "./Components/MessengerComponent/MessengerComponent";
import { MessengerOpenContext } from "./hooks/Context/MessengerOpenContextProvider";

function App() {

 
  const location = useLocation()
  const {isMessengerOpen, closeMessenger} = useContext(MessengerOpenContext);

  return (
    <div className="app">
      <TransitionGroup>
         <CSSTransition timeout={400} classNames="fade" key={location.key}>
            <Switch location={location}>
               <Route exact path="/">
                  <FormDataContextProvider>
                     <LoginSection />
                  </FormDataContextProvider>
               </Route>
               <Route path="/createAcount">
                  <div>
                     <FormDataContextProvider>
                        <LoginSection />
                     </FormDataContextProvider>
                     <RegistrationForm />
                  </div>
               </Route>
               <Route path="/resetPassword">
                  <ResetPasswordSection />
               </Route>
               <Route path="/board/:userId">
                  <UserContextProvider userId={location.pathname.replace(/\/board\//, "").replace(/\/.+[\s\S]/,"")}>
                         <Board/>
                         {isMessengerOpen && <MessengerComponent />}
                  </UserContextProvider>
               </Route>
             
            </Switch>
         </CSSTransition>
      </TransitionGroup>  
        
    </div>
  );
}

export default App;


// dokoćczyć formularz rejestracji - data urodzenia i płeć