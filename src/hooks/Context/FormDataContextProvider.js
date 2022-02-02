import React, {useState} from "react";
const FormDataContext = React.createContext();

function FormDataContextProvider(props) {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
            hasAccess: false
        }
    );

    function handleChange(event) {
        const {name, value, type, checked} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type==="checkbox"? checked : value,
        }))
    }

    return (
        <FormDataContext.Provider value={{formData, handleChange}}>
            {props.children}
        </FormDataContext.Provider>
    )
}

export {FormDataContextProvider, FormDataContext};
