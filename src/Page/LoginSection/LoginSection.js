import React, { useState, useContext} from 'react';
import "./LoginSection.css"
import {Link} from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase";
import LoginForm from '../LoginForm/LoginForm';
import {SaveDataContext} from "../../hooks/Context/SaveDataContextProvider";

function LoginSection() {

    const {saveData, usersDataName} = useContext(SaveDataContext)
    const [addAccessUser, setAddAccessUser] = useState(false);

    function removeAvatar(user) {
        user.wasLoged = false;
        saveData(usersDataName, userDatabase);
    }

    const usersElems = userDatabase.map(user => (
        user.wasLoged && user.hasAccess ?
        <div key={user.id} className='avatar--container'>
            <div className="exit remove-avatar" onClick={() => removeAvatar(user)}>
                <span className="line line-1"></span>
                <span className="line line-2"></span>
            </div>
            <Link to={`/board/${user.id}`}>
                <div className='avatar'>
                    <img className='avatar__img' src={user.profileImg} alt='profile img' />
                    <div className='avatar__name'><p>{user.name}</p></div>
                </div>
            </Link>
        </div> :
        user.wasLoged ?
        <div key={user.id} className='avatar--container'>
            <div className="exit remove-avatar" onClick={() => removeAvatar(user)}>
                <span className="line line-1"></span>
                <span className="line line-2"></span>
            </div>
            <div className='avatar' onClick={() => addAccess()}>
                <img className='avatar__img' src={user.profileImg} alt='profile img' />
                <div className='avatar__name'><p>{user.name}</p></div>
            </div>
        </div>:
        <div key={user.id}></div>
    ))

    function addAccess() {
        setAddAccessUser(true)
    }

    const [pageCreator, setPageCreater] = useState(false);

    return (
        <section className='login'>
            <div className='login__content'>
                <img className='fb--logo' src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' alt="example"/>
                <h2>Ostatnie logowania</h2>
                <p className='login__content--text'>Kliknij zdjęcie avatara aby zalogować się do konta demo lub dodaj nowe</p>
                <div className='login__content--avatars'>
                    {usersElems}
                    <div className='avatar' onClick={addAccess}>
                        <div className='avatar__add avatar__img'><i className="fas fa-plus-circle"></i></div>
                        <div className='avatar__name'><p>Dodaj konto</p></div>
                    </div>
                </div>
            </div>
            <div className='form__container'>
                <LoginForm userDatabase={userDatabase} />
                <p className='ad-text'><span onClick={() => setPageCreater(prevState => !prevState)} >Utwórz stronę</span> dla gwiazdy, marki lub firmy</p>
                {pageCreator && <h3 className='info'>Ta opcja nie jest jeszcze dostępna</h3>}
            </div>
            
            {addAccessUser && <LoginForm userDatabase={userDatabase} modal/>}
        </section>
    );
}

export default LoginSection;