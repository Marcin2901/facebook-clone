import React, {useState, useContext} from "react";
import "./MessengerComponent.css";
import { MessengerOpenContext } from "../../hooks/Context/MessengerOpenContextProvider";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import FacebookItem from "../FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";

function MessengerComponent() {

    const {closeMessenger, selectUserMessages} = useContext(MessengerOpenContext);
    const user = useContext(UserContext);
    const messageIndex =  user.messages.indexOf(user.messages.find(message => message.userId === selectUserMessages.id))

    const [messageForm, setMessageForm] = useState({myMessage: ""})

    function handleChange(event) {
        const {name, value} = event.target
        setMessageForm({[name]: value});
    }

    function sendMessage(event) {
        if(event.key === "Enter" || event.target.id ==="submit" || event.target.id === "like") {
            console.log(messageForm)
            user.messages[messageIndex].ourMessages.unshift({fromUserId: user.id, text: messageForm.myMessage})
            const selectUserMessageIndex =  selectUserMessages.messages.indexOf(selectUserMessages.messages.find(message => message.userId === user.id))
            selectUserMessages.messages[selectUserMessageIndex].ourMessages.unshift({fromUserId: user.id, text: messageForm.myMessage})
            setMessageForm({myMessage: ""})
            localStorage.setItem("users", JSON.stringify(userDatabase))
        }
    }

    function sendLike(event) {
        messageForm.myMessage =  <i class="fas fa-thumbs-up like"></i>
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
                    {
                        messageIndex >= 0 && user.messages[messageIndex].ourMessages.length > 0 ? 
                        user.messages[messageIndex].ourMessages.map(message => (
                            <p className={message.fromUserId === selectUserMessages.id ? "message-left" : "message-right"}>
                                {message.text}
                            </p>
                        ))
                        :
                        <h4>{`Nie masz jeszcze żadnych wiadomości z ${selectUserMessages.name}`}</h4>
                    }
                </div>
                <div className="messenger--type">
                    <input type={"text"}
                           placeholder="Aa"
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