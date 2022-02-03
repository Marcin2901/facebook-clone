import React from "react";
import userDatabase from "../../DemoDatabase/userDatabase";
const UserContext = React.createContext();


function UserContextProvider(props) {

    const user = userDatabase.find(user => user.id === props.userId );
    
    return (
        <UserContext.Provider value={user} >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext};
