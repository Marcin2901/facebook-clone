import React, {useContext} from "react";
import "./ProfilePagePhotos.css";
import {UserContext} from "../../../hooks/Context/UserContextProvider";
function ProfilePagePhotos() {

    const user = useContext(UserContext);

    return(
        <div className="profile--page__photos">
            <h2>Zdjecia</h2>
            <div className="photos--container">
                <img src={user.getProfileImg()} alt={"example"}/>
            </div>
        </div>
    )
}

export default ProfilePagePhotos;