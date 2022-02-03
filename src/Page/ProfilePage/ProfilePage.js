import React, {useContext} from 'react';
import "./ProfilePage.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import {Link} from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase"

// if (document.body.scrollTop <= 0 ) {
//     alert ("scrolling down")
// } else {
//     alert ("scrolling up")
// }


function ProfilePage() {

    const user = useContext(UserContext);

    const [scrollDirection, setScrollDirection] = React.useState(false)
    React.useEffect(() => {
        // true jeśli scroll up i false jeśli scroll down
        window.addEventListener('scroll', () => {(window.onscroll = function(e) {
            setScrollDirection(this.oldScroll > this.scrollY);
            this.oldScroll = this.scrollY;
          })})
          //ogarnij to czyszczenie
        // return function cleanup() {
        //         window.removeEventListener("scroll");
        // }
    }, [])



    return (
        <section className='profile--page'>
            <div className='profile__header--container'>
                <header className='profile--header'>
                    <div className='profile--header__hero'>
                        <img src={user.getProfileImg()} />
                        <button className='btn edit--btn'><i className="fas fa-camera"></i>Dodaj zdjęcie w tle</button>
                        <div className='profile--header__hero--bg'></div>
                    </div>
                    <div className='profile--header__info'>
                        <h1 className='profile--header__name'>{user.getFullName()}</h1>
                    </div>
                    <nav className='profile--header__nav'>
                        <ul className='profile__nav--ul'>
                            <li className='active'>Posty</li>
                            <li>Informacje</li>
                            <li>Znajomi<span className='friends-quantity'>0</span></li>
                            <li>Zdjęcia</li>
                            <li>Więcej <i className="fas fa-sort-down"></i></li>
                        </ul>
                        <div className='profile__nav--buttons'>
                            <button className='rel--btn btn login--btn'><span className='plus-icon--bg'><i className="fas fa-plus"></i></span>Utwórz relację</button>
                            <button className='btn edit--btn'><i className="fas fa-pen"></i>Edytuj profil</button>
                        </div>
                    </nav>
                </header>
            </div>
            <div className='profile__main--container'>    
                <main className='profile--main'>
                   
                    <aside className='profile--main__aside' style={{top: scrollDirection ? "100px" : "-100px"}}>
                        <div className='presentation__aside'>
                            <h2>Prezentacja</h2>
                            <div>Edytuj szczegóły</div>
                            <div>Dodaj hobby</div>
                            <div>Dodaj wyróżnione</div>
                        </div>
                        <div className='images__aside'>
                            <div>
                                <h2>Zdjęcia</h2>
                                {/* dodaj ścieżke */}
                                <Link to="/">
                                    <p>Zobacz wszystkie zdjęcie</p>
                                </Link>
                            </div>
                            {user.getAllImages().map((img, index) => <img key={index} className='img--aside' src={img} />)}
                        </div>
                        <div className='friends__aside'>
                        <div>
                                <h2>Znajomi</h2>
                                {/* dodaj ścieżke */}
                                <Link to="/">
                                    <p>Pokaż wszystkich znajomych</p>
                                </Link>
                            </div>
                            <div className='friends__aside--container'>
                             
                                {
                                
                                    userDatabase.filter(currentUser => { 
                                        
                                        return user.getAllFriends().includes(currentUser.id)})
                                        .map(friend => {
                                            
                                          return  (
                                            
                                            <div key={friend.id}>
                                                 <img src={friend.getProfileImg()} />
                                                 <h5>{friend.getFullName()}</h5>
                                            </div>
                                        )})
                                }
                            </div>
                        </div>
                    </aside>
                    <div className='profile--main__content'>
                        <div className='post-creator'>
                            <div className='post-creator__top'>
                                <img src={user.getProfileImg()} />
                                <div className='post-creator__btn'>Co słychać ?</div>
                            </div>
                            <div className='post-creator__bottom'>
                                <div className='post-creator__opt'><i className="fas fa-photo-video"></i>Zdjęcie/film</div>
                                <div className='post-creator__opt'><i className="fas fa-user-tag"></i>Oznacz znajomych</div>
                                <div className='post-creator__opt'><i className="fas fa-flag"></i>Wydarzenie z życia</div>
                            </div>
                        </div>
                        <div className='post'></div>
                        <div className='post'></div>
                        <div className='post'></div>
                        <div className='post'></div>
                        <div className='post'></div>
                        <div className='post'></div>
                    </div>
                </main>
            </div> 
        </section>
        
    );
}

export default ProfilePage;
