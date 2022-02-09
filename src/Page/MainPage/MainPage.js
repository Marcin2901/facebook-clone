import React, {useContext} from "react";
import "./MainPage.css";
import Aside from "../Aside/Aside";
import Contacts from "../Contacts/Contacts";
import userDatabase from "../../DemoDatabase/userDatabase";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import PostComponent from "../../Components/PostComponent/PostComponent";

function MainPage() {


    const user = useContext(UserContext);
    let watchedUser = null;
    const postsElem = userDatabase.map(currentUser => {
        
         watchedUser = currentUser !== user ? currentUser : user
       return (
        currentUser.getAllPosts().map(post => {
            

           return (
            <PostComponent key={post.getId()} post={post} watchedUser={watchedUser} />
         )})
    )})

    return (
        <div className="main--page__container">
            <Aside />
            <div className="main--page__content">
                {postsElem}
            </div>
            <Contacts />
        </div>
    )
}

export default MainPage;