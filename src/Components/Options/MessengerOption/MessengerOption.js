import React, { useContext } from "react";
import "../Option.css";
import "./MessengerOption.css";
import { UserContext } from "../../../hooks/Context/UserContextProvider";
import SearchBar from "../../SearchBar/SearchBar";

function MessengerOption() {

    const user = useContext(UserContext);

    return (
        <div className="option__container messenger__container">
            <header className="messenger--header">
                <h2>Messenger</h2>
                <div className="messenger--header__content">
                    <i className="fas fa-ellipsis-h tooltip"><span className="tooltiptext">Opcje</span></i>
                    <i class="fas fa-arrows-alt tooltip"><span className="tooltiptext">Pokaż wszystko w Messengerze</span></i>
                    <i class="fas fa-video tooltip"><span className="tooltiptext">Utwórz nowy pokój</span></i>
                    <i class="far fa-sticky-note tooltip"><span className="tooltiptext">Nowa wiadomość</span></i>
                </div>
            </header>
            <SearchBar linkTo={"messages"}/>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
            <h2>Marcin</h2>
        </div>
    )
}

export default MessengerOption;
