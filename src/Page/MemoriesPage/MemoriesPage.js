import React from "react";
import "./MemoriesPage.css";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";

function MemoriesPage() {
    return (
        <div className="page--container">
            <AsideComponent title="Wspomnienia"  items={[]}/>
            <div className="page__content">
                <div className="page--box">
                    <img src="https://www.facebook.com/images/goodwill/throwback/permalink/tetra/tetra_home_header-2x.png" alt="example"/>
                    <h3>Brak wspomnień na dziś</h3>
                    <p>Dziś nie ma żadnych wspomnień do wyświetlenia lub udostępnienia. Poinformujemy Cię,
                        gdy wspomnienia będą dostępne do przejrzenia.</p>
                </div>
            </div>
        </div>
    )
}

export default MemoriesPage;