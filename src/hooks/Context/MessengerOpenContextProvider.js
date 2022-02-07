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
    
    const [updated, setUpdated] = useState([]);

    return (
        <MessengerOpenContext.Provider 
            value={{isMessengerOpen, openMessenger, closeMessenger, selectUserMessages, setSelectUserMessages, updated, setUpdated}}>
                {props.children}
        </MessengerOpenContext.Provider>
    )
}

export { MessengerOpenContextProvider, MessengerOpenContext }