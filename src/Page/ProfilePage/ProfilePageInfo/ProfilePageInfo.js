import React, {useContext} from "react";
import { UserContext } from "../../../hooks/Context/UserContextProvider";
import "./ProfilePageInfo.css";
import userDatabase from "../../../DemoDatabase/userDatabase";

function ProfilePageInfo() {

    const user = useContext(UserContext);

    return (
        <div className="profile--page__info">
            <div className="info--container">
                <aside className="info__aside">
                    <h2>Informacje</h2>
                    <ul>
                        <li>Przegląd</li>
                        <li>Praca i wykształcenie</li>
                        <li>Wcześniejsze miejsca zamieszkania</li>
                        <li>Dane kontaktowe i podstawowe informacje</li>
                        <li>Rodzina i związki</li>
                        <li>Szczegółowe informacje o Tobie</li>
                        <li>Wydarzenia z życia</li>
                    </ul>
                </aside>

                <div className="info__content">
                    <span><i class="fas fa-plus"></i> Dodaj miejsce pracy</span>
                    <span><i class="fas fa-plus"></i> Dodaj nazwę uczelni</span>
                    <span><i class="fas fa-plus"></i> Dodaj miejsce zamieszkania</span>
                    <span><i class="fas fa-plus"></i> Dodaj rodzinną miejscowość</span>
                    <span><i class="fas fa-plus"></i> Dodaj status zwoązku</span>
                    <span><i class="fas fa-plus"></i> Dodaj telefon kontaktowy</span>
                </div>

            </div>
                <div className="info__friends">
                    <h2>Znajomi</h2>
                    <div className="info__friends--content">
                        {user.getAllFriends().map((friendId, index) => {
                            const friend = userDatabase.find(currentUser => currentUser.id === friendId)              
                            if(index < 8) return (
                                <div className="friend--tile">
                                <img src={`${friend.getProfileImg()}`} />
                                <div className="friend--tile__text">
                                    <h4>{friend.getFullName()}</h4>
                                    <span>Zobacz profil na facebooku</span>
                                </div>
                                </div>
                            )
                            
                        })}
                    </div>
                    <button className="btn all-friends--btn">Zobacz wszysto</button>
                </div>
        </div>
    )
}

export default ProfilePageInfo;