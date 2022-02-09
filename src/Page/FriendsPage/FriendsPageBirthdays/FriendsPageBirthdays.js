import React, {useContext} from "react";
import "./FriendsPageBirthdays.css";
import {UserContext} from "../../../hooks/Context/UserContextProvider";
import FacebookItem from "../../../Components/FacebookItem/FacebookItem";
import userDatabase from "../../../DemoDatabase/userDatabase";

function FriendsPageBirthdays() {

    const user = useContext(UserContext);

    const birthElem = user.getAllFriends().map(friendId => {
        const currentFriend = userDatabase.find(currentUser => currentUser.id === friendId)
      return  (
        <><FacebookItem img={currentFriend.getProfileImg()} text={currentFriend.getFullName()}
                      alternativeText={"tutaj pobierz date urodzenia"} size={"big"}/><hr /></>
    )})

    return (
        <div className="friends--page__birthdays">
            {/* warunek jeśli ktoś z tablicy user.getAllFriends() ma urodiiny */}
            {false && 
                <div></div>
            }
            <div className="friends-birth__container">
                <h3>Nadchodzące urodziny</h3>
                {birthElem}
            </div>
        </div>
    )
}

export default FriendsPageBirthdays;