import React, {useContext, useEffect} from "react";
import "./MessengerPage.css";
import MessengerComponent from "../../Components/MessengerComponent/MessengerComponent";
import MessengerOption from "../../Components/Options/MessengerOption/MessengerOption";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import {MessengerOpenContext} from "../../hooks/Context/MessengerOpenContextProvider";
import userDatabase from "../../DemoDatabase/userDatabase";

function MessengerPage() {

    const user = useContext(UserContext);
    const {openMessenger,selectUserMessaged, setSelectUserMessages} = useContext(MessengerOpenContext);
    useEffect(() => {
        if(!selectUserMessaged) {
            if(user.id === userDatabase[0].id) {
               setSelectUserMessages(userDatabase[1]) 
               user.setIsReadToTrue(user.id, userDatabase[1].id);
            }
            else {
               setSelectUserMessages(userDatabase[0]) 
               user.setIsReadToTrue(user.id, userDatabase[0].id);    
            }
        }
    }, [])

    return (
        <div className="messenger--page">
            <MessengerOption messComp/>
            <MessengerComponent isComponent/>
            <div className="messenger--page__right-col">

            </div>
        </div>
    )
}

export default MessengerPage