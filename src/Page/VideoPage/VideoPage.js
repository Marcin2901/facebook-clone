import React, { useContext } from "react";
import "./VideoPage.css";
import {Switch, Route} from "react-router-dom";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";
import {UserContext} from "../../hooks/Context/UserContextProvider"
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import NotAvailableComponent from "../../Components/NotAvailableComponent/NotAvailableComponent";

function VideoPage() {

    const user = useContext(UserContext);

    const items = [{elem: <FacebookItem icon={<i class="fab fa-youtube icon--item"></i>} text={"Stron główna"}/>, ending: "videos"},
                   {elem: <FacebookItem icon={<i class="fas fa-video icon--item"></i>} text={"Na żywo"}/>, ending: "videos/liveVideo" },
                   {elem: <FacebookItem icon={<i class="fas fa-film icon--item"></i>} text={"Programy"}/>, ending: "videos/programs"},
                   {elem: <FacebookItem icon={<i class="fas fa-bookmark icon--item"></i>} text={"Zapisane filmy"}/>, ending: "videos/saveVideo"}]
                   
    return (
        <section className="video">
            <AsideComponent title={"Watch"} headerElem={<SearchBar />} items={items} />
            <main>
                <Switch>
                    <Route exact path={`/board/${user.id}/videos`}>
                        <NotAvailableComponent title={"Polecane filmy"}/>
                    </Route>
                    <Route path={`/board/${user.id}/videos/liveVideo`}>
                        <NotAvailableComponent title={"Oglądaj na żywo"} />
                    </Route>
                    <Route path={`/board/${user.id}/videos/programs`}>
                        <NotAvailableComponent title={"Programy oryginalne Facebooka"} />
                    </Route>
                    <Route path={`/board/${user.id}/videos/saveVideo`}>
                        <NotAvailableComponent title={"Zapisane filmy"}/>
                    </Route>

                </Switch>
            </main>
        </section>
    )
}

export default VideoPage;