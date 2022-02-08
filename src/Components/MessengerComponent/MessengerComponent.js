import React, {useState, useContext} from "react";
import "./MessengerComponent.css";
import { MessengerOpenContext } from "../../hooks/Context/MessengerOpenContextProvider";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import FacebookItem from "../FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";

function MessengerComponent() {

    const {closeMessenger, selectUserMessages} = useContext(MessengerOpenContext);
    //zalogowany user
    const user = useContext(UserContext);
    // w nowszej wersji możemy pobrać obiekt messengera z konkretnym userem podając id userów
    // (1 obiekt)-{Messenger} : [messagesArray], userOneId(to user), userTwoId(to selectUser), alreadyRead=false
    let messenger = user.getMessagesFromMessenger(user.id, selectUserMessages.id);
    

    //formularz dla nowej wiadomości
    const [messageForm, setMessageForm] = useState({myMessage: ""})
    //obsługa formularza
    function handleChange(event) {
        const {name, value} = event.target
        setMessageForm({[name]: value});
    }


    function sendMessage(event) {
        if(event.key === "Enter" || event.target.id ==="submit" || event.target.id === "like") {
            if(!messenger) {
                user.addMessenger(user.id, selectUserMessages, [{userId: user.id, isRead: true}, {userId: selectUserMessages.id, isRead: false}]);
                messenger = user.getMessagesFromMessenger(user.id, selectUserMessages.id);
            }
            user.addMessageToMessenger(user.id, selectUserMessages.id, messageForm.myMessage);
            user.setIsReadToFalse(user.id, selectUserMessages.id);
            setMessageForm({myMessage: ""});
            const messengerIndex = user.messages.indexOf(user.messages.find(message => message.messengerId === messenger.messengerId));
            user.messages.splice(messengerIndex, 1);
            user.messages.push(messenger);
      
            localStorage.setItem("users", JSON.stringify(userDatabase));
        }
    }

    function sendLike(event) {
        messageForm.myMessage =  "👍🏻"
        sendMessage(event);
    }


    return (
        <div className="messenger__box">
            <div className="messenger--item">
                <div className="exit" onClick={closeMessenger}>
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                </div>
                <header className="messenger--item-header">
                    <FacebookItem img={selectUserMessages.profileImg}
                                  text={`${selectUserMessages.name} ${selectUserMessages.lastname}`}
                                  alternativeText={<span>Aktywny(a)</span>}/>
                </header>
                <div className="messenger__content">
                    {console.log("Jebany Mesenger")}
                    {console.log(user.messages)}
                    {/* Logika wyświetlania wiadomości */}
                    {messenger ? 
                        messenger.messagesArray.map(message => (
                            <p className={message.userOneId === selectUserMessages.id ? "message-left" : "message-right"}>
                                {message.text}
                            </p>
                        ))
                        :
                        <h4 className="no--messages">{`Nie masz jeszcze żadnych wiadomości z ${selectUserMessages.name}`}</h4>
                    }
                </div>
                <div className="messenger--type">
                    <input type={"text"}
                           placeholder="Aa"
                           autoComplete="off"
                           name="myMessage"
                           value={messageForm.myMessage}
                           onChange={(e) => handleChange(e)}
                           onKeyDown={(e) => sendMessage(e)}
                    />
                    <div className="messenger--type-icons">
                         <i id="like" class="fas fa-thumbs-up" onClick={(e) => sendLike(e)}></i>
                         <i id="submit" class="fas fa-paper-plane" onClick={(e) => sendMessage(e)}></i>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MessengerComponent;