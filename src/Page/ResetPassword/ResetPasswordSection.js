import React, {useState} from "react" 
import "./ResetPasswordSection.css";
import {Link, Redirect} from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase";


function ResetPasswordSection() {
    
    const [resetPasswordData, setResetPasswordData] = useState({email: "", verified: false, password1: "", password2: ""});
    //zmien na statey w obkiet
    const [passwordError, setPasswordError] = useState(false);
    const [isClicked, setIsClicked] = useState(false)
    const [forgetEmail, setForgetEmail] = useState(false)
    const [user, setUser] = useState(null); 
    const [passwordChanged, setPasswordChanged] = useState(false)

    function handleChange(event) {
        const {name, value} = event.target;
        setResetPasswordData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function verifyEmail() {
        const isInDatabase = findUser() ? true : false
        setResetPasswordData(prevState => ({...prevState, verified: isInDatabase}));
        setIsClicked(true);
    }

    function changePassword() {
        const user = findUser()
        if(resetPasswordData.password1 === resetPasswordData.password2 && resetPasswordData.password1.length > 4) {
            user.changePassword(resetPasswordData.password1)
            user.setAccess(false)
            const div = document.createElement('div');
            setTimeout(() => {
                setPasswordChanged(true);
                div.textContent = "Hasło zmieniono pomyślnie";
                div.classList.add("info", "sign")
                document.body.append(div)
            }, 1000);
            setTimeout(() => {
                document.body.removeChild(div)
            }, 3000);
        } else {
            setPasswordError(true);
        }
    }

    function findUser() {
        const user = userDatabase.find(user => user.email === resetPasswordData.email);
        setUser(user)
        return user;
    }

    return (
        <section className="login">

            <div className="reset__container">
                <h1>Zresetuj hasło</h1>
                {( !isClicked || !resetPasswordData.verified ) &&
                <div>
                <p>Wpisz swój email:</p>
                <input type="email"
                       name="email"
                       value={resetPasswordData.email}
                       onChange={(e) => handleChange(e)}
                />
                </div>
                }
                {isClicked && !resetPasswordData.verified && <h3 className='warning'>Podany email nie znajduje się w bazie danych</h3>}    
                {resetPasswordData.verified &&
                    <div className="password--wrapper">
                        <div>
                            <h4>Podaj nowe hasło:</h4>
                            <input type="password"
                                name="password1"
                                value={resetPasswordData.password1}
                                onChange={(e) => handleChange(e)}
                            />
                            <h4>Potwierdź nowe hasło:</h4>
                            <input type="password"
                                name="password2"
                                value={resetPasswordData.password2}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className="user">
                                <img className="profileImg" src={`${user.getProfileImg()}`} />
                                <h4>{user.getFullName()}</h4>
                                <h5>Użytkownik Facebooka</h5>
                        </div>
                    </div>  
                }
                {passwordError && <h3 className='warning'>Hasła nie są takie same lub mają poniżej 5 znaków</h3>   }
                   
                <div className="reset--options">
                    <a onClick={() => setForgetEmail(prevState => !prevState)}>Nie pamiętasz swojego emaila?</a> 
                    {
                        resetPasswordData.verified ?
                      
                        <button onClick={changePassword} className="btn login--btn">
                            {"Zmień hasło"}
                        </button> 
                       :
                        
                        <button onClick={verifyEmail} className="btn login--btn">
                            {"Kontynuuj"}
                        </button> 
                    }   
                </div>
                {forgetEmail && <h3 className="warning">Ups... nie będę Cię okłamywał... masz spory problem :( </h3>}
                {passwordChanged && <Redirect to={"/"} />}
            </div>
        </section>
    )
}

export default ResetPasswordSection;