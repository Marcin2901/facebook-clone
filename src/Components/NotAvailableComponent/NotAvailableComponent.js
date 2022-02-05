import React from "react";
import "./NotAvailableComponent.css";

function NotAvailableComponent({title}) {
    return (
        <div className="not-available">
            <h1>{title}</h1>
            <div className="info--box">
                <p>Funkcjonalność jeszcze nie dostępna</p>
                <p>Prosimy spróbować później</p>
            </div>
        </div>
    )
}

export default NotAvailableComponent;