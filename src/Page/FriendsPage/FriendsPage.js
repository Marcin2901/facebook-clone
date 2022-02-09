import React, {useContext} from "react";
import "./FriendsPage.css";
import {Switch, Route} from "react-router-dom";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import FriendsPageMain from "./FriendsPageMain/FriendsPageMain";
import FriendsPageInvitations from "./FriendsPageInvitations/FriendsPageInvitations";

function FriendsPage() {

    const user = useContext(UserContext)

    const items = [{elem: <FacebookItem icon={<i class="fas fa-user-friends icon--item"></i>} text="Strona główna"/>, ending: "friends"},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Zaproszenia do grona znajomych"/>, ending: "friends/invitations"},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Propozycje"/>, ending: ""},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Wszyscy znajomi"/>, ending: ""},
                   {elem: <FacebookItem icon={<i class="fas fa-gift icon--item"></i>} text="Urodziny"/>, ending: ""},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Listy niestandardowe"/>, ending: ""}]

    return (
        <section className="friends--page">  
            <Switch>
                    <Route exact path={`/board/${user.id}/friends`}>
                        <AsideComponent title="Znajomi" headerElem={<></>} items={items}/>
                        <FriendsPageMain />
                    </Route>   
                    <Route path={`/board/${user.id}/friends/invitations`}>
                        <FriendsPageInvitations />
                    </Route>
                    
            </Switch>
        </section>
    )
}

export default FriendsPage;