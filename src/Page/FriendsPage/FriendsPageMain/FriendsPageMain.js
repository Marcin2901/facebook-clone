import React from "react";
import "./FriendsPageMain.css";
import userDatabase from "../../../DemoDatabase/userDatabase";
import UserTileComponent from "../../../Components/UserTileComponent/UserTileComponent";

function FriendsPageMain() {

    const userTilesElems = userDatabase.map(user => (
        <UserTileComponent imgSrc={user.getProfileImg()} name={user.getFullName()}/>
    ))

    return (
        <main>
            <div className="friends--page__main">
                <h2>Osoby które możesz znać</h2>
                <div className="users--container">
                    {userTilesElems}
                </div>
            </div>
        </main>
    )
}

export default FriendsPageMain