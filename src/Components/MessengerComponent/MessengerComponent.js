import React, {useState, useContext} from "react";
import "./MessengerComponent.css";
import { MessengerOpenContext } from "../../hooks/Context/MessengerOpenContextProvider";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import FacebookItem from "../FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";

function MessengerComponent() {

    const {closeMessenger, selectUserMessages, setUpdated} = useContext(MessengerOpenContext);
    const user = useContext(UserContext);
    let messageIndex =  user.messages.indexOf(user.messages.find(message => message.userId === selectUserMessages.id))

    const [messageForm, setMessageForm] = useState({myMessage: ""})

    function handleChange(event) {
        const {name, value} = event.target
        setMessageForm({[name]: value});
    }

    function sendMessage(event) {
        if(event.key === "Enter" || event.target.id ==="submit" || event.target.id === "like") {
            if(messageIndex < 0) {
                user.messages.push({userId: selectUserMessages.id, ourMessages: []})
                selectUserMessages.messages.push({userId: user.id, ourMessages: []})
                messageIndex =  user.messages.indexOf(user.messages.find(message => message.userId === selectUserMessages.id))
                setUpdated(prevState => [...prevState, selectUserMessages.id]);
            }
            user.messages[messageIndex].ourMessages.unshift({fromUserId: user.id, text: messageForm.myMessage})
            const selectUserMessageIndex =  selectUserMessages.messages.indexOf(selectUserMessages.messages.find(message => message.userId === user.id))
            selectUserMessages.messages[selectUserMessageIndex].ourMessages.unshift({fromUserId: user.id, text: messageForm.myMessage})
            setMessageForm({myMessage: ""})
            setUpdated(prevState => [...prevState, user.id]);
            // ustawienie wiadomości nowej wiadomości na górze listy
            user.messages.push(user.messages[messageIndex])
            user.messages.splice(messageIndex, 1)
            selectUserMessages.messages.push(selectUserMessages.messages[selectUserMessageIndex])
            selectUserMessages.messages.splice(selectUserMessageIndex, 1)

            localStorage.setItem("users", JSON.stringify(userDatabase))
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
                    {
                        messageIndex >= 0 && user.messages[messageIndex].ourMessages.length > 0 ? 
                        user.messages[messageIndex].ourMessages.map(message => (
                            <p className={message.fromUserId === selectUserMessages.id ? "message-left" : "message-right"}>
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