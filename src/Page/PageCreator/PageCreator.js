import React, {useContext} from "react";
import "./PageCreator.css";
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import {Switch, Route} from "react-router-dom";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import AsideComponent from "../../Components/AsideComponent/AsideComponent";
import NotAvailableComponent from "../../Components/NotAvailableComponent/NotAvailableComponent";

function PageCreator() {

    const user = useContext(UserContext);

    const items = [{elem: <FacebookItem icon={<i className="fas fa-sitemap icon--item"></i>} text={"Meta Business Suite"}/>, ending: "pagesCreator/meta"},
                   {elem: <FacebookItem icon={<i className="fas fa-compass icon--item"></i>} text={"Odkryj"}/>, ending: "pagesCreator/discovery" },
                   {elem: <FacebookItem icon={<i className="fas fa-thumbs-up icon--item"></i>} text={"Polubione strony"}/>, ending: "pagesCreator/likedPages" },
                   {elem: <FacebookItem icon={<i className="fas fa-user-plus icon--item"></i>} text={"Zaproszenia"}/>, ending: "pagesCreator/invitagesPages" }]
    
    const headerELem = <div className="create--page-btn"><i className="fas fa-plus"></i> Utwórz nową stronę</div>

    return (
        <section className="page--creator">
            <AsideComponent title={"Strony"} headerElem={headerELem} items={items}  />
            <main>
                <Switch>
                    <Route path={`/board/${user.id}/pagesCreator/meta`}>
                        <NotAvailableComponent title={"Meta Business Suite"} />
                    </Route>
                    <Route path={`/board/${user.id}/pagesCreator/discovery`}>
                        <NotAvailableComponent title={"Odkryj ciekawe strony"} />
                    </Route>
                    <Route path={`/board/${user.id}/pagesCreator/likedPages`}>
                         <NotAvailableComponent title={"Wszystkie strony, które lubisz lub obserwujesz"} />
                    </Route>
                    <Route path={`/board/${user.id}/pagesCreator/invitagesPages`}>
                         <NotAvailableComponent title={"Zaproszenia"} />
                    </Route>
                </Switch>
                
            </main>
        </section>
    )
}

export default PageCreator;