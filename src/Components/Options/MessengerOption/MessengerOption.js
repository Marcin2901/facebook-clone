import React, { useContext } from "react";
import "../Option.css";
import "./MessengerOption.css";
import { UserContext } from "../../../hooks/Context/UserContextProvider";
import SearchBar from "../../SearchBar/SearchBar";
import FacebookItem from "../../FacebookItem/FacebookItem";
import userDatabase from "../../../DemoDatabase/userDatabase";
import { MessengerOpenContext } from "../../../hooks/Context/MessengerOpenContextProvider";

function MessengerOption(props) {

    const user = useContext(UserContext);
    const {openMessenger, setSelectUserMessages, updated, setUpdated} = useContext(MessengerOpenContext);

    function handleClick(messageUser) {
        openMessenger()
        props.closeAllOption()
        setSelectUserMessages(messageUser);
        setUpdated(prevState => [...prevState].filter(ids => ids !== messageUser.id))   
    }


    return (
        <div className="option__container messenger__container">
            <header className="messenger--header">
                <h2>Messenger</h2>
                <div className="messenger--header__content">
                    <i className="fas fa-ellipsis-h tooltip"><span className="tooltiptext">Opcje</span></i>
                    <i class="fas fa-arrows-alt tooltip"><span className="tooltiptext">Pokaż wszystko w Messengerze</span></i>
                    <i class="fas fa-video tooltip"><span className="tooltiptext">Utwórz nowy pokój</span></i>
                    <i class="far fa-sticky-note tooltip"><span className="tooltiptext">Nowa wiadomość</span></i>
                </div>
            </header>
            <SearchBar closeAllOption={props.closeAllOption}/>
            <div className="messages-users_constainer">
            {user.messages.length > 0 &&
                user.messages.map(message => {
                   
                    const messageUser = userDatabase.find(currentUser => currentUser.id === message.userId);
                 
                   return (
                    //zapakuj itema w link otwierający MessangerComponent z konkretym userem
                    <div onClick={() => handleClick(messageUser)} className={updated.find(ids => ids === messageUser.id) && "new-message"}>
                        <FacebookItem img={messageUser.profileImg} 
                                    text={`${messageUser.name} ${messageUser.lastname}`} 
                                    alternativeText={"Zobacz wiadomości"}
                                    size="big"
                        />
                    </div>
                    )
            })
            }
            </div>
        </div>
    )
}

export default MessengerOption;
