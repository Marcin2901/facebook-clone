import React, { useState } from "react";
import "./RegistrationForm.css";
import { Link, Redirect } from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase";
import User from "../../classes/User";

function RegistrationForm() {


    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        dateOfBirth: "",
        sex: ""
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => ( 
            {
               ...prevState,
               [name]: value
            }
        ))
    }

    const [registerValidation, setRegisterValidation] = useState({
        isEmailValid: true,
        isRegisterSuccessfully: false
    })

    function createUser(event) {
        event.preventDefault()
        const {name, lastname, dateOfBirth, sex, email, password} = formData;
        verifyEmail(email) && 
        userDatabase.push(new User(name, lastname, dateOfBirth, sex, email, password))
    }

    function verifyEmail(email) {
        const alreadyInDatabase = userDatabase.find(user => user.email === email) ? false : true
        setRegisterValidation(prevState => ({
            isEmailValid: alreadyInDatabase,
            isRegisterSuccessfully: alreadyInDatabase}))
        return alreadyInDatabase;
    }
    

    return (
        <div className="form__modal">
            <form className="registration--form">
                <h1>Zarejestruj się</h1>
                <p className="registration--form__para">To szybkie i proste</p>
                <Link to="/">
                    <div className="exit">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                    </div>
                </Link>

                <div className="name--fields">
                    <input type="text" 
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           required
                           placeholder="Imię"/>
                    <input type="text" 
                           name="lastname"
                           value={formData.lastname}
                           onChange={handleChange}
                           required
                           placeholder="Nazwisko" />
                </div>

                <input type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       required
                       placeholder="Email" /> 

                {!registerValidation.isEmailValid && <h3 className="warning">Email już znajduje się w bazie danych</h3>}

                <input type="password"
                       name="password"
                       value={formData.password}
                       onChange={handleChange}
                       required
                       placeholder="Nowe hasło" />

                <h4>Data urodzenia</h4>
                <input type="date"
                       name="dateOfBirth"
                       value={formData.dateOfBirth}
                       onChange={handleChange}
                       className="dateInput"
                    //    required
                       name="Birthdate" />

                <h4>Płeć</h4>
                <div className="radio--fields">
                    <label className="radio--field">
                        Kobieta
                        <input type="radio"
                               name="sex"
                               
                               />    
                    </label>          
                    <label className="radio--field">
                        Mężczyzna
                        <input type="radio"
                               name="sex"
                               />    
                    </label>
                </div>

                <p className="registration--text"> Klikając przycisk Zarejestruj się, akceptujesz nasz Regulamin.
                    Zasady dotyczące danych informują, w jaki sposób gromadzimy,
                    użytkujemy i udostępniamy dane użytkowników, a Zasady dotyczące
                    plików cookie informują jak korzystamy z plików cookie i
                    podobnych technologii. Możesz otrzymywać powiadomienia SMS
                    z Facebooka, z których możesz zrezygnować w dowolnej chwili.
                </p>
                
                <button onClick={createUser} className="btn register--btn reg--btn">Zarejestruj się</button>    
                
                { registerValidation.isRegisterSuccessfully && <Redirect to="/" />}
            </form>
        </div>
    )
}

export default RegistrationForm