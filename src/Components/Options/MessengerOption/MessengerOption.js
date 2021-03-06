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
    const {openMessenger, setSelectUserMessages} = useContext(MessengerOpenContext);

    function handleClick(messageUser) {
        openMessenger()
        !props.messComp && props.closeAllOption()
        user.setIsReadToTrue(user.id, messageUser.id);
        setSelectUserMessages(messageUser);
        localStorage.setItem("users", JSON.stringify(userDatabase)); 
    }

    // user => zalogowany user dla którego sprawdzamy czy wiadomość jest przeczytana
    // messageUser => user z którym piszemy -> potrzebny do zlokalizowania messengera
    function checkIfMessageIsRead(messageUser) {
       return !user.isMessagesAlreadyRead(user.id, messageUser.id) ? "new-message" : ""
    }


    return (
        <div className="option__container messenger__container">
            <header className="messenger--header">
                <h2>Messenger</h2>
                <div className="messenger--header__content">
                    <i className="fas fa-ellipsis-h tooltip"><span className="tooltiptext">Opcje</span></i>
                    <i className="fas fa-arrows-alt tooltip"><span className="tooltiptext">Pokaż wszystko w Messengerze</span></i>
                    <i className="fas fa-video tooltip"><span className="tooltiptext">Utwórz nowy pokój</span></i>
                    <i className="far fa-sticky-note tooltip"><span className="tooltiptext">Nowa wiadomość</span></i>
                </div>
            </header>
            <SearchBar closeAllOption={props.closeAllOption}/>
            <div className="messages-users_constainer">
            {user.messages.length > 0 &&
                user.messages.map((message, index) => {
                    const messageUserSide = message.userOneId === user.id ? "userTwoId" : "userOneId";
                    const messageUser = userDatabase.find(currentUser => currentUser.id === message[messageUserSide]);
                 
                   return (
                    <div key={index} onClick={() => handleClick(messageUser)} className={checkIfMessageIsRead(messageUser)}>
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