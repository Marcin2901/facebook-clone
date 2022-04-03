import React, {useContext} from 'react';
import "./MarketPlacePage.css";
import {Switch, Route} from "react-router-dom";
import {UserContext} from "../../hooks/Context/UserContextProvider"
import AsideComponent from '../../Components/AsideComponent/AsideComponent';
import SearchBar from "../../Components/SearchBar/SearchBar";
import FacebookItem from '../../Components/FacebookItem/FacebookItem';
import NotAvailableComponent from '../../Components/NotAvailableComponent/NotAvailableComponent';

function MarketPlacePage() {

  const user = useContext(UserContext);

  const items = [{elem: <FacebookItem icon={<i className="fas fa-store icon--item"></i>} text={"Przeglądaj wszystkie"}/>, ending: "marketplace"},
                 {elem: <FacebookItem icon={<i className="fas fa-bell icon--item"></i>} text={"Powiadomienia"}/>, ending: "marketplace/notification"},
                 {elem: <FacebookItem icon={<i className="fas fa-shopping-basket icon--item"></i>} text={"Kupno"}/>, ending: "marketplace/purchase"},
                 {elem: <FacebookItem icon={<i className="fas fa-balance-scale-left icon--item"></i>} text={"Sprzedaż"}/>, ending: "marketplace/sale"}]

  return (
      <section className='marketplace'>
          <AsideComponent title={"Marketplace"} headerElem={<SearchBar />} items={items}/>
          <main>
             <Switch>
                 <Route exact path={`/board/${user.id}/marketplace`}>
                     <NotAvailableComponent title={"Przeglądanie wszystkich propozycji"} />
                 </Route>
                 <Route path={`/board/${user.id}/marketplace/notification`}>
                     <NotAvailableComponent title={"Powiadomienia"} />
                 </Route>
                 <Route path={`/board/${user.id}/marketplace/purchase`}>
                     <NotAvailableComponent title={"Brak aktywności"} />
                 </Route>
                 <Route path={`/board/${user.id}/marketplace/sale`}>
                     <NotAvailableComponent title={"Podsumowanie"} />
                 </Route>
             </Switch>
          </main>
      </section>
  )
}

export default MarketPlacePage;