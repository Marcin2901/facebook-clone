import React, { useContext} from "react";
import "../Option.css";
import "./NotificationsOption.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../hooks/Context/UserContextProvider"
import FacebookItem from "../../FacebookItem/FacebookItem";
import { ScrollToContext } from "../../../hooks/Context/ScrollToContextProvider";

import userDatabase from "../../../DemoDatabase/userDatabase"

function NotificationsOption() {

    const user = useContext(UserContext);

    function remakeNotificationText({notificationOwner, type, notificationBody, target, boardOwnerId}) {
        const isMyNotification = notificationOwner === user.getFullName()
        const boardOwner = userDatabase.find(currentUser => currentUser.id === boardOwnerId)
      
        // isMyNotification => true jeśli user jest sprawcą powiadomienia
        // target.author => kto jest twórcą postu
        // user.getFullName() => kto jest obecnie zalogowany
        //boardOwner => zalogowany user jeżeli robi modyfikacje na swojej tablicy 
        //           => właściciel tablicy jeżeli zalogowany user robi modyfikacje na czyjejś tablicy
        switch(type) {
            case 0: switch(true) {
                        case isMyNotification && boardOwner.getFullName() === user.getFullName() :
                            return "Dodałeś(aś) post na swojej osi czasu"  
                        case isMyNotification :
                            return `Dodałęś(aś) post na osi ➜ ${boardOwner.getFullName()}`
                        case !isMyNotification && boardOwner.getFullName() === user.getFullName() :
                            return `${notificationOwner} dodał post na Twojej osi czasu`
                        case !isMyNotification && notificationOwner === boardOwner.getFullName() :
                            return `${notificationOwner} dodał post na swojej osi czasu`
                        default : return `${notificationOwner} dodał post na osi ➜ ${boardOwner.getFullName()}`
                    }
            case 1: switch(true) {
                        case isMyNotification && target.author === user.getFullName() && boardOwner.getFullName() !== user.getFullName():
                            return `Skomentowałeś(aś) swój post no osi czasu ➜ ${boardOwner.getFullName()}`
                        case isMyNotification && target.author === user.getFullName() :
                            return "Skomentowałeś(aś) swój post";
                        case isMyNotification :
                            return `Skomentowałeś(aś) post użytkownika ➜ ${target.author}`;
                        case !isMyNotification && target.author === user.getFullName() :
                            return `${notificationOwner} skomentował(a) Twój post`;
                        case !isMyNotification && notificationOwner === target.author :
                            return `${notificationOwner} skomentował(a) swój post`;
                        default : return `${notificationOwner} skomentował post użytkownika ➜ ${target.author}`
                    
                    }
            case 2: return `${isMyNotification ? "Wysłałeś" : notificationOwner + " wysyła Ci" } ${notificationBody.text}`;
            default : return "Błąd systemu powiadomień"
        }
    }

    const {setScrollElemId} = useContext(ScrollToContext);

    return ( 
        <div className="option__container notifications__container">
            <header className="notifications--header">
                <h2>Powiadomienia</h2>
                <i className="fas fa-ellipsis-h"></i>
            </header>
            <div className="notifications--buttons"> 
                <button className="notif--btn btn active">Wszystkie</button>
                <button className="notif--btn btn">Nieprzeczytane</button>
            </div>
            <div className="notificationds--info">

                <h4>Najnowsze</h4>
                <Link to={"/"}>
                    Wyświetl wszystko
                </Link>
            </div>

            <div className="notifications__content">
                { user.getAllNotifications().length > 0 ?
                    user.getAllNotifications().map((notification, index) => (

                        <div key={index} className={notification.alreadyRead ? "notification" : "notification new-notification"}
                             onClick={() => {
                                 notification.alreadyRead = true
                                 localStorage.setItem("users", JSON.stringify(userDatabase))
                                 setScrollElemId(notification.target.id)
                                }}
                        >
                            <Link to={`/board/${user.id}/profile/${notification.boardOwnerId}`}>
                            <FacebookItem img={notification.notificationImage}
                                          text={remakeNotificationText(notification)}
                                          alternativeText={<small>{notification.notificationDate.toString()}</small>}
                                          size={"big"}
                            />
                            {!notification.alreadyRead && <span className="notification-new"></span>}
                            <span className="notification-icon">{<i className={`${notification.notificationBody.icon}`}></i>}</span>
                            </Link>
                        </div>
                )) :
                    <h4 className="notifications__content--info">Brak Powiadomień</h4>
                }
            </div>
        </div>
    )
}

export default NotificationsOption;