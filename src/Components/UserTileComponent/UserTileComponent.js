import React from "react";
import "./UserTileComponent.css";

function UserTileComponent(props) {

    const {imgSrc, name} = props;

    return (
        <div className="user--tile">
            <div className="user--img">
                <img src={imgSrc} alt="example"/>
            </div>
            <div className="user--tile__content">
                <h3>{name}</h3>
                <button className="btn add-friend--btn">Dodaj do znajomych</button>
                <button className="btn delete-tile--btn">Usuń</button>
            </div>
        </div>
    )
}

export default UserTileComponent;