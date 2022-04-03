import React, {useState} from "react";
const ScrollToContext = React.createContext();

function ScrollToContextProvider(props) {

    const [scrollElemId, setScrollElemId] = useState(null)

    return (
        <ScrollToContext.Provider value={{scrollElemId, setScrollElemId}}>
            {props.children}
        </ScrollToContext.Provider>
    )
}

export {ScrollToContextProvider, ScrollToContext};