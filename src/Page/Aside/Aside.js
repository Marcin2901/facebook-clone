import React, {useContext} from "react";
import "./Aside.css";
import {UserContext} from "../../hooks/Context/UserContextProvider";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import additionalAppDatabase from "../../DemoDatabase/additionalAppDatabase";
import { Link } from "react-router-dom";

function Aside() {

    const user = useContext(UserContext)

    const appElems = additionalAppDatabase.map((app, index) => (
        <Link to={`/board/${user.id}/${app.link}`} key={index}>
            <FacebookItem img={app.icon} text={app.name} />
        </Link>
    ))

    return (
        <aside className="aside__container">
            <Link to={`/board/${user.id}/profile`}>
                <FacebookItem img={user.getProfileImg() } text={user.getFullName()} />
            </Link>
            {appElems}
        </aside>
    )
}

export default Aside;