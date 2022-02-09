import React from "react";
import "./FriendsPageInvitations.css";
import FriendsPageInvitationsAside from "./FriendsPageInvitationsAside/FriendsPageInvitationsAside";

function FriendsPageInvitations() {
    return (
        <div className="friends--page__invitations">
            <FriendsPageInvitationsAside />
            <main>
                <div className="friends--page__invitations--content">
                    <img src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
                        alt="friends img" />
                    <h1>Wybierz imie i nazwisko osoby, aby wyświetlić podgląd jej profilu</h1>
                </div>
            </main>
        </div>
    )
}

export default FriendsPageInvitations;