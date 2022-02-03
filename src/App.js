import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import LoginSection from "./Page/LoginSection/LoginSection";
import Board from "./Page/Board/Board";
import RegistrationForm from "./Page/RegistrationForm/RegistrationFrom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FormDataContextProvider } from "./hooks/Context/FormDataContextProvider";
import { UserContextProvider } from "./hooks/Context/UserContextProvider";
import ResetPasswordSection from "./Page/ResetPassword/ResetPasswordSection";

function App() {

 
  const location = useLocation()

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
                     {/* Po I Board mimo że wewnątrz posiada własnego Switcha nie potrzebuje być owrapowany w <Router>
                         bo cały komponent App jest w niego owrapowany i to tak jakby przechodzi a jekbyśmy to zrobili
                         to by nam się posypało - czemu to nwm ale to dobrze że Router może być tylko jeden
                         
                         Po II UseContextProvider znajduje i przekazuje urzytkownika na podstawie Id jakie mu przekazujemy
                         to Id bierzemy z jego logowania i przekazujemy jako useParams() do Providera jednak poniewaz 
                         w różnych miejscach aplikacji ścieżka się zmienia a :userId może być tak samo 123 jaki i 
                         123/wiadomosci dlatego na tej lokacji dokonaliśmy 2 zmian: czyli usuneliśmy wsęp czyli /board/
                         oraz usuneliśmy wszystko co jest za znakiem / czyli finalnie zostaje nam samo id ale musimy pamiętać
                         że kiedy chodzimy po /board/id/... to zawsze po id musi być slesh "/" */}
                         <Board/>
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