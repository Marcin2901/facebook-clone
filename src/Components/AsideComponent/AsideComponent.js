import React, {useContext} from "react";
import "./AsideComponent.css";
import {Link} from "react-router-dom";
import {UserContext} from "../../hooks/Context/UserContextProvider";

function AsideComponent(props) {

    const user = useContext(UserContext);

    const contentElem = props.items.map(item => (
            <Link to={`/board/${user.id}/${item.ending}`}>
                {item.elem}
            </Link>
    ))

    return (
        <aside className="componetn--aside">
            <div className="component--aside-header">
                <h1>{props.title}</h1>
                <i class="fas fa-cog icon--item"></i>
            </div>
            <div className="componetn--aside__input--wrapper">
                {props.headerElem}
            </div>
            <div className="component--aside__content">
                {contentElem}
            </div>
    </aside>
    )
}

export default AsideComponent;