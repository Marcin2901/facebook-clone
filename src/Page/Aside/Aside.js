import React, {useContext} from "react";
import "./Aside.css";
import {UserContext} from "../../hooks/Context/UserContextProvider";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import additionalAppDatabase from "../../DemoDatabase/additionalAppDatabase";
import { Link } from "react-router-dom";

function Aside() {

    const user = useContext(UserContext)

    const appElems = additionalAppDatabase.map((app, index) => (
        <FacebookItem key={index} img={app.icon} text={app.name} />
    ))

    return (
        <aside className="aside__container">
            <Link to="">
                <FacebookItem img={user.getProfileImg() } text={user.getFullName()} />
            </Link>
            {appElems}
        </aside>
    )
}

export default Aside;