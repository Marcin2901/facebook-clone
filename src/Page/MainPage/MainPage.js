import React from "react";
import "./MainPage.css";
import Aside from "../Aside/Aside";
import Contacts from "../Contacts/Contacts";

function MainPage() {
    return (
        <div className="page__container">
            <Aside />
            {/* <MainContent /> */}
            <Contacts />
        </div>
    )
}

export default MainPage;