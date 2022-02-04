import React, { useContext } from "react";
import "../Option.css";
import "./NotificationsOption.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../hooks/Context/UserContextProvider"
import FacebookItem from "../../FacebookItem/FacebookItem";

function NotificationsOption() {

    const user = useContext(UserContext);

    return ( 
        <div className="option__container notifications__container">
            <header className="notifications--header">
                <h2>Powiadomienia</h2>
                <i className="fas fa-ellipsis-h"></i>
            </header>
            <div className="notifications--buttons"> 
            {/* dodaj onClicki na przycisku w sumie to nie onClicki tylko nwm Link i zmana active czy coś */}
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
                    user.getAllNotifications().map(notification => (
                        //później zamień w linka!
                        <div className="notification">
                            <FacebookItem img={notification.getNotificationImage()}
                                        text={notification.getNotificationBody().getText()}
                            />
                            <small className="notrfication-time">{notification}</small>
                            {!notification.isAlreadyRead() && <sapn className="notification-new"></sapn>}
                        </div>
                )) :
                    <h4 className="notifications__content--info">Brak Powiadomień</h4>
                }
            </div>
        </div>
    )
}

export default NotificationsOption;