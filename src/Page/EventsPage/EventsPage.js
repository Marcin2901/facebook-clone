import React from "react";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";

function EventsPage() {
    return (
        <div className="page--container">
            <AsideComponent title="Wydarzenia"  items={[]}/>
            <div className="page__content">
                <div className="page--box">
                    <img src="https://www.facebook.com/images/goodwill/throwback/permalink/tetra/tetra_home_header-2x.png" alt="example"/>
                    <h3>Brak nadchodzących wydarzeń</h3>
                    <p>Na ten moment nie masz żadnego nadchodzącego wydarzenia. Poinformujemy Cię gdy jakieś
                        wydarzenie będzie dostępne dla Ciebie
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EventsPage;