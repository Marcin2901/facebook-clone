import React from "react";
import "../Option.css";
import "./MenuOption.css";
import FacebookItem from "../../FacebookItem/FacebookItem";
import SearchBar from "../../SearchBar/SearchBar";
import additionalAppDatabase  from "../../../DemoDatabase/additionalAppDatabase";
import {Link} from "react-router-dom";

function MenuOption() {


    const appElems = additionalAppDatabase.map((app, index) => (
        <Link to={"dadaj linki do bazy danych"}>
             <FacebookItem key={index} img={app.icon} text={app.name} />
        </Link>
    ))

    return (
        <div className="option__container menu__container">
            <h2>Menu</h2>
            <div className="menu__content">
                <div className="search--menu">
                    <h3>Społęcznościowe</h3>
                    {appElems}
                </div>
                <div className="create--menu">
                    <h3>Utwórz</h3>
                    <FacebookItem icon={<i class="far fa-clipboard"></i>} text={"Opublikuj"}/>
                    <FacebookItem icon={<i class="fas fa-book-open"></i>} text={"Relacja"}/>
                    <FacebookItem icon={<i class="fas fa-hourglass-start"></i>} text={"Wydarzenie z życia"}/>
                    <FacebookItem icon={<i class="far fa-address-card"></i>} text={"Post w grupie"}/>
                    <FacebookItem icon={<i class="far fa-flag"></i>} text={"Strona"}/>
                    <FacebookItem icon={<i class="fas fa-bullhorn"></i>} text={"Rekalama"}/>
                    <FacebookItem icon={<i class="fas fa-users"></i>} text={"Grupa"}/>
                    <FacebookItem icon={<i class="fas fa-calendar-plus"></i>} text={"Zdarzenie"}/>
                    <FacebookItem icon={<i class="fas fa-cart-plus"></i>} text={"Ogłoszenie w Marketplace"}/>
                    <FacebookItem icon={<i class="fas fa-coins"></i>} text={"Zbiórka pieniędzy"}/>
                </div>
            </div>
        </div>
    )
}

export default MenuOption;