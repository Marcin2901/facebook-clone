import React from "react"
const SaveDataContext = React.createContext();
const USERS_DATABASE_NAME = "users"

function SaveDataContextProvider(props) {

    function saveData(dataName, dataValue) {
        localStorage.setItem(dataName, JSON.stringify(dataValue));
    }

    

    return (
        <SaveDataContext.Provider value={{saveData, usersDataName: USERS_DATABASE_NAME}}>
            {props.children}
        </SaveDataContext.Provider>
    )
}

export {SaveDataContextProvider, SaveDataContext}