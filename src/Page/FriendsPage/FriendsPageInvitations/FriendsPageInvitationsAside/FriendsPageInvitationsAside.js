import React from "react";
import "./FriendsPageInvitationsAside.css";
import {useHistory} from "react-router-dom";
import userDatabase from "../../../../DemoDatabase/userDatabase";
import FacebookItem from "../../../../Components/FacebookItem/FacebookItem";

function FriendsPageInvitationsAside() {

    const history = useHistory();

    const btnsElem = <div className="invitations--aside__mian--btns">
                        <button className="btn agree-invitation--btn">Potwierdź</button>
                        <button className="btn delete-invitation--btn">Usuń</button>
                    </div>

    const invitationsElem = userDatabase.map(user => (
        <div key={user.id} className="invitation--item">
            <FacebookItem img={user.getProfileImg()} text={user.getFullName()} size={"big"}/>
            {btnsElem}
        </div>
    ))

    return (
        <aside className="invitations--aside">
            <header className="invitations--aside__header">
                <div className="invitations--aside__header--arrow-back">
                     <i className="fas fa-arrow-left" onClick={() => history.goBack()}></i>
                </div>
                <div className="invitations--aside__header--content">
                    <span>Znajomi</span>
                    <h1>Zaproszenia do grona znajomych</h1>
                </div>
            </header>
            <div className="invitatons--aside__content">
                <h4>12 Zaproszeń do grona znajomych</h4>
                <span>Pokaż wysłane zaproszenia</span>
                <div className="invitations--aside__main--invitations">
                    {invitationsElem}
                </div>
            </div>
        </aside>
    )
}

export default FriendsPageInvitationsAside;