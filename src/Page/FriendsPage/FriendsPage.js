import React, {useContext} from "react";
import "./FriendsPage.css";
import {Switch, Route} from "react-router-dom";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import FriendsPageMain from "./FriendsPageMain/FriendsPageMain";
import FriendsPageInvitations from "./FriendsPageInvitations/FriendsPageInvitations";
import FriendsPageOffers from "./FriendsPageOffers/FriendsPageOffers";
import FriendsPageAll from "./FriendsPageAll/FriendsPageAll";
import FriendsPageBirthdays from "./FriendsPageBirthdays/FriendsPageBirthdays";

function FriendsPage() {

    const user = useContext(UserContext)

    const items = [{elem: <FacebookItem icon={<i class="fas fa-user-friends icon--item"></i>} text="Strona główna"/>, ending: "friends"},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Zaproszenia do grona znajomych"/>, ending: "friends/invitations"},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Propozycje"/>, ending: "friends/offers"},
                   {elem: <FacebookItem icon={<i class="fas fa-user-plus icon--item"></i>} text="Wszyscy znajomi"/>, ending: "friends/all"},
                   {elem: <FacebookItem icon={<i class="fas fa-gift icon--item"></i>} text="Urodziny"/>, ending: "friends/birthday"}]

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
                    <Route path={`/board/${user.id}/friends/offers`}>
                        <FriendsPageOffers />
                    </Route>
                    <Route path={`/board/${user.id}/friends/all`}>
                        <FriendsPageAll />
                    </Route>
                    <Route path={`/board/${user.id}/friends/birthday`}>
                        <AsideComponent title="Znajomi" headerElem={<></>} items={items}/>
                        <FriendsPageBirthdays />
                    </Route>
            </Switch>
        </section>
    )
}

export default FriendsPage;