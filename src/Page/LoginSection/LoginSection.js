import React from 'react';
import "./LoginSection.css"
import {Link} from "react-router-dom";
import profileImg from "./demo-profil.jpg";
function LoginSection() {


    const usersElems = "tutaj trafią zdjęcia urzytkowników pobranych z localStorage i zapisanych w useState"

  return (
      <section className='login'>
          <div className='login__content'>
              <img className='fb--logo' src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
              <h2>Ostatnie logowania</h2>
              <p className='login__content--text'>Kliknij zdjęcie avatara aby zalogować się do konta demo lub dodaj nowe</p>
              {/* Cały ten div ma być generowany automatycznie na podstawie luczy
              urzytkowników do max 5 a na końcu ma być zawsze możliwość dodania nowego */}
              <div className='login__content--avatars'>
                <div className='avatar'>
                    <img className='avatar__img' src={profileImg} alt='profile img' />
                    <div className='avatar__name'><p>Sara</p></div>
                </div>
                <div className='avatar'>
                    <img className='avatar__img' src={profileImg} alt='profile img' />
                    <div className='avatar__name'><p>Sara</p></div>
                </div>

                {/* ostatni element avatara to dodanie avatara a na onClick ma pokazywać się
                modal z możliwością zalogowania, jeżeli urzytkownik znajduje się w bazie danych
                to zostanie dodany do tego diva zaraz przed tym avatarem 
                musisz też dorzucić możliwość usuwania avatarów */}
                <div className='avatar'>
                    <div className='avatar__add avatar__img'><i class="fas fa-plus-circle"></i></div>
                    <div className='avatar__name'><p>Dodaj konto</p></div>
                </div>
              </div>
          </div>
          <div className='form__container'>
              <div className='form__container--content'>
                    <form className='login__form'>
                        <input type="email"
                            name='email'
                            placeholder='Adres email lub numer telefonu'/>
                        <input type="password"
                            name='password'
                            placeholder='Hasło' />
                        <button className='btn login--btn'>Zaloguj się</button>
                        <Link to="/resetPassword" className='password-forget--link'>Nie pamiętasz hasła?</Link>
                    </form>
                    <button className='btn register--btn'>Utwórz nowe konto</button>
              </div>
            
            <p className='ad-text'><span>Utwórz stronę</span> dla gwiazdy, marki lub firmy</p>
          </div>
         
      </section>
  );
}

export default LoginSection;
