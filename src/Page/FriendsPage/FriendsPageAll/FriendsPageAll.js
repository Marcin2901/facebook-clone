import React, { useContext } from "react";
import "./FriendsPageAll.css";
import {Link, useHistory} from "react-router-dom";
import userDatabase from "../../../DemoDatabase/userDatabase";
import FacebookItem from "../../../Components/FacebookItem/FacebookItem";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import {UserContext} from "../../../hooks/Context/UserContextProvider";



function FriendsPageAll() {

    const history = useHistory();
    const user = useContext(UserContext);

    const allFriendsElem = userDatabase.map(user => (
    <div className="allFriends--item">
        <Link>
            <FacebookItem img={user.getProfileImg()} text={user.getFullName()} size={"big"}
                          alternativeText={<small>11 wspólnych znajomych</small>}/>
        </Link>
    </div> 
    ))

    return (
        <div className="friends--page__allFriends">
            <aside className="allFriends--aside">
                <header className="allFriends--aside__header">
                    <div className="allFriends--aside__header--arrow-back">
                        <i class="fas fa-arrow-left" onClick={() => history.goBack()}></i>
                    </div>
                    <div className="allFriends--aside__header--content">
                        <span>Znajomi</span>
                        <h4>Wszyscy Znajomi</h4>
                        <SearchBar isInNavbar />
                    </div>
                </header>
                <div className="invitatons--aside__content">
                    <h4>{user.getAllFriends().length} znajomych</h4>
                    <div className="allFriends--aside__main--allFriends">
                        {allFriendsElem}
                    </div>
                </div>
            </aside>     
            <main>
                <div className="friends--page__allFriends--content">
                    <img src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
                        alt="friends img" />
                    <h1>Wybierz imie i nazwisko osoby, aby wyświetlić podgląd jej profilu</h1>
                </div>
            </main>
        </div>
    )
}

export default FriendsPageAll;