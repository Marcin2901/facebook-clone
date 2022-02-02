import React, { useContext, useState } from "react";
import "./LoginForm.css";
import {Link, Redirect} from "react-router-dom";
import {FormDataContext} from "../../hooks/Context/FormDataContextProvider";

function LoginForm(props) {

    const {formData, handleChange} = useContext(FormDataContext);
    const {userDatabase} = props

    const [isLogin, setIsLogin] = useState();
    const [wrongLoginData, setWrongLoginData ] = useState(false)

    function logIn(event) {
        event.preventDefault()
        const user =  userDatabase.find(user => (user.email === formData.email && user.password === formData.password))
        user ? setIsLogin(user) : setWrongLoginData(true)
        if(user) {
            user.wasLoged = true;
            formData.hasAccess ? user.hasAccess = true : user.hasAccess = false;
        }
     }

     const modalElem = ( props.modal && 
            <div>
                <h1>Zaloguj się do Facebooka</h1>
                <Link to="/">
                    <div className="exit">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                    </div>
                </Link>
            </div> 
        )

    return (
        <div className={props.modal && "modal"}>
            <div className='form__container--content'> 
                {modalElem}
                {wrongLoginData && <h3 className='warning'>niepoprawny email i/lub hasło!</h3>}
                <form className='login__form'>
                    <input type="email"
                        name='email'
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        placeholder='Adres email lub numer telefonu'
                    />
                        
                    <input type="password"
                        name='password'
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                        placeholder='Hasło'
                    />

                    {props.modal && <label className="remember-label">
                                        <input type="checkbox"
                                               checked={formData.hasAccess}
                                               name="hasAccess"
                                               onChange={(e) => handleChange(e)} />
                                        Zapamiętaj mnie
                                    </label>
                    }   

                    <button onClick={logIn} className='btn login--btn'>Zaloguj się</button>

                    {isLogin && <Redirect to={`/board/${isLogin.id}`}/>} 

                    <Link to="/resetPassword" className='password-forget--link'>Nie pamiętasz hasła?</Link>
                </form>

                {   !props.modal && 
                    <Link to="/createAcount">
                        <button className='btn register--btn'>Utwórz nowe konto</button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default LoginForm;