import React from "react";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";

function SavesPage() {
    return (
        <div className="page--container">
        <AsideComponent title="Zapisane"  items={[]}/>
        <div className="page__content">
            <div className="page--box">
                <img src="https://www.facebook.com/images/goodwill/throwback/permalink/tetra/tetra_home_header-2x.png"/>
                <h3>Nie masz żadnych zapisanych plików</h3>
                <p>Wszystkie zapisane przez Ciebie pliku będą wyświetlane na tej stronie</p>
            </div>
        </div>
    </div>
    )
}

export default SavesPage;