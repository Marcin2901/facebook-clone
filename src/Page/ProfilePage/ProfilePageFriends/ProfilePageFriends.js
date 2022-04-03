import React, {useContext} from "react";
import "./ProfilePageFriends.css";
import userDatabase from "../../../DemoDatabase/userDatabase";
import { UserContext } from "../../../hooks/Context/UserContextProvider";

function ProfilePageFriends() {

    const user = useContext(UserContext);

    return (
        <div className="profile--page__friends">

            <div className="info__friends">
                 <h2>Znajomi</h2>
                 <div className="info__friends--content">
                    {user.getAllFriends().map((friendId, index) => {
                        const friend = userDatabase.find(currentUser => currentUser.id === friendId)              
                        return (
                            <div key={index} className="friend--tile">
                                <img src={`${friend.getProfileImg()}`} alt={"example"}/>
                                <div className="friend--tile__text">
                                    <h4>{friend.getFullName()}</h4>
                                    <span>Zobacz profil na facebooku</span>
                                </div>
                            </div>
                        )
                        
                    })}
                 </div>
            </div>
        </div>
    )
}

export default ProfilePageFriends;