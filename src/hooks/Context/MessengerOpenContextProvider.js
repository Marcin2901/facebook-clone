import React, {useState} from "react";
const MessengerOpenContext = React.createContext();

function MessengerOpenContextProvider(props) {

    const [isMessengerOpen, setIsMessengerOpen] = useState(false);

    function openMessenger() {
        setIsMessengerOpen(true);
    }
    function closeMessenger() {
        setIsMessengerOpen(false)
    }

    const [selectUserMessages, setSelectUserMessages] = useState({});

    return (
        <MessengerOpenContext.Provider 
            value={{isMessengerOpen, openMessenger, closeMessenger, selectUserMessages, setSelectUserMessages}}>
                {props.children}
        </MessengerOpenContext.Provider>
    )
}

export { MessengerOpenContextProvider, MessengerOpenContext }