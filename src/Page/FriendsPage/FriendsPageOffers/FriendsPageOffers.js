import React from "react";
import "./FriendsPageOffers.css";
import {Link, useHistory} from "react-router-dom";
import userDatabase from "../../../DemoDatabase/userDatabase";
import FacebookItem from "../../../Components/FacebookItem/FacebookItem";

function FriendsPageOffers() {

    const history = useHistory();

    const btnsElem = <div className="offers--aside__mian--btns">
                        <button className="btn agree-offers--btn">Potwierdź</button>
                        <button className="btn delete-offers--btn">Usuń</button>
                    </div>

    const offersElem = userDatabase.map(user => (
        <div className="offers--item">
            <Link>
                <FacebookItem img={user.getProfileImg()} text={user.getFullName()} size={"big"}/>
            </Link>
            {btnsElem}
        </div> 
        ))

    return (
        <div className="friends--page__offers">
            <aside className="offers--aside">
                <header className="offers--aside__header">
                    <div className="offers--aside__header--arrow-back">
                        <i class="fas fa-arrow-left" onClick={() => history.goBack()}></i>
                    </div>
                    <div className="offers--aside__header--content">
                        <span>Znajomi</span>
                        <h1>Propozycje</h1>
                    </div>
                </header>
                <div className="invitatons--aside__content">
                    <h4>osoby które możesz znać</h4>
                    <div className="offers--aside__main--offers">
                        {offersElem}
                    </div>
                </div>
            </aside>     
            <main>
                <div className="friends--page__offers--content">
                    <img src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
                        alt="friends img" />
                    <h1>Wybierz imie i nazwisko osoby, aby wyświetlić podgląd jej profilu</h1>
                </div>
            </main>
        </div>
       
    )
}

export default FriendsPageOffers;