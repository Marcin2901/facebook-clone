import React, {useContext} from "react";
import "./GroupPage.css";
import {Switch, Route} from "react-router-dom";
import {UserContext} from "../../hooks/Context/UserContextProvider";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";
import SearchBar from "../../Components/SearchBar/SearchBar";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import NotAvailableComponent from "../../Components/NotAvailableComponent/NotAvailableComponent";

function GroupPage() {

    const user = useContext(UserContext);

    const items = [{elem: <FacebookItem icon={<i class="fas fa-chart-line icon--item"></i>} text={"Twoje Aktywności"} />, ending: "groups"},
                   {elem: <FacebookItem icon={<i class="fas fa-compass icon--item"></i>} text={"Odkryj"} />, ending: "groups/discovery"},
                   {elem: <FacebookItem icon={<i class="fas fa-bell icon--item"></i>} text={"Twoje powiadomienia"} />, ending: "groups/notification"}]

    return (
        <section className="group--page">
            <AsideComponent title={"Grupy"} headerElem={<SearchBar />} items={items}/>
            <main>
                <Switch>
                    <Route exact path={`/board/${user.id}/groups`}>
                        <NotAvailableComponent title={"Ostatnia aktywność"}/>
                    </Route>
                    <Route path={`/board/${user.id}/groups/discovery`}>
                        <NotAvailableComponent title={"Proponowane dla Ciebie"}/>
                    </Route>
                    <Route path={`/board/${user.id}/groups/notification`}>
                        <NotAvailableComponent title={"Jesteś na bierząco"}/>
                    </Route>
                </Switch>
            </main>
        </section>

    )
}

export default GroupPage;