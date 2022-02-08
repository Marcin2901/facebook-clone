import React, {useContext, useState} from 'react';
import "./ProfilePage.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import {Link, useParams} from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase";
import PostComponent from "../../Components/PostComponent/PostComponent"
import CreatePostComponent from '../../Components/CreatePostComponent/CreatePostComponent';
import {ScrollToContext} from "../../hooks/Context/ScrollToContextProvider";



function ProfilePage() {
    
    const user = useContext(UserContext);
    const {findUserId} = useParams()

    //właściciel obserwowanego profilu
    const watchedUser = userDatabase.find(currentUser => currentUser.id === findUserId && user.id !== findUserId)

    const [developProfile, setDevelopProfile] = useState({
        changeProfileImg: false,
        changeBackgroundImg: false,
        createPost: false
    })

    const [scrollDirection, setScrollDirection] = useState(false)
    React.useEffect(() => {
        // zapewnia że strona nie będzie się scrolować do dołu 
        //to niżej do usunięcia!
        window.scrollTo(0, 0);
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

    const {scrollElemId, setScrollElemId} = useContext(ScrollToContext);
    
    //ustawianie OY na post z powiadomień
    React.useEffect(() => {
        if(scrollElemId) {
            const scrollElem =  document.getElementById(scrollElemId);
            window.scrollTo(0, scrollElem.offsetTop - 120);
            setScrollElemId(null);
        }
    }, [scrollElemId])


    

// dodać możliwość zmiany zdjęcia profilowego i w tle
//obsługa nawigacji
//dopracjuj pozycje sticky dla aside w 67 linijce lub w css

    return (
        <section className='profile--page'>
            {developProfile.createPost && <CreatePostComponent watchedUser={watchedUser}/>}
            {/* {developProfile.changeProfileImg && <SetProfileImgComponent />}
            {developProfile.changeBackgroundImg && <SetBackgroundImgComponent />} */}
            <div className='profile__header--container'>
                <header className='profile--header'>
                    <div className='profile--header__hero'>
                        <div className='profile-img--box'> 
                            <img src={watchedUser ? watchedUser.getProfileImg() : user.getProfileImg()} alt={"user img"}/>
                            {!watchedUser &&
                            <button className='profile-img--btn'><i className="fas fa-camera"></i></button>
                            }
                        </div>
                        {!watchedUser &&
                        <button className='btn edit--btn'><i className="fas fa-camera"></i>Dodaj zdjęcie w tle</button>
                        }
                        <div className='profile--header__hero--bg'></div>
                    </div>

                    <div className='profile--header__info'>
                        <h1 className='profile--header__name'>{watchedUser ? watchedUser.getFullName() : user.getFullName()}</h1>
                    </div>

                    <nav className='profile--header__nav'>
                        <ul className='profile__nav--ul'>
                            {/* tutaj też pamiętaj żeby rozóżnić czy bierzesz info o sobie czy o obserwowanym profilu */}
                            <li className='active'>Posty</li>
                            <li>Informacje</li>
                            <li>Znajomi<span className='friends-quantity'>0</span></li>
                            <li>Zdjęcia</li>
                            <li>Więcej <i className="fas fa-sort-down"></i></li>
                        </ul>
                        <div className='profile__nav--buttons'>
                            {  watchedUser ?
                                <>
                                <button className='btn edit--btn'><i class="fas fa-user-friends"></i>Znajomi</button>
                                <button className='rel--btn btn login--btn'><span className='plus-icon--bg'><i class="fab fa-facebook-messenger"></i></span>Wyślij wiadomość</button>
                                </> :
                                <>
                                <button className='rel--btn btn login--btn'><span className='plus-icon--bg'><i className="fas fa-plus"></i></span>Utwórz relację</button>
                                <button className='btn edit--btn'><i className="fas fa-pen"></i>Edytuj profil</button>
                                </>
                            }
                        </div>
                    </nav>

                </header>
            </div>

            <div className='profile__main--container'>  

                <main className='profile--main'>       
                    <aside className='profile--main__aside' style={{top: scrollDirection ? "50px" : "50px"}}>
                        <div className='presentation__aside'>
                            <h2>Prezentacja</h2>
                            {!watchedUser &&
                            <>
                                <div className='presentation--box'>Edytuj szczegóły</div>
                                <div className='presentation--box'>Dodaj hobby</div>
                                <div className='presentation--box'>Dodaj wyróżnione</div>
                            </>
                            }
                        </div>
                        <div className='images__aside'>
                            <div className='flex-2'>
                                <h2>Zdjęcia</h2>
                                {/* dodaj ścieżke */}
                                <Link to="/">
                                    <p className='aside--link'>Zobacz wszystkie zdjęcie</p>
                                </Link>
                            </div>
                            <div className='image--container'>
                                { watchedUser ? 
                                  watchedUser.getAllImages().map((img, index) => <img key={index} className='img--aside' src={img} alt={"user img"}/>)
                                  :
                                  user.getAllImages().map((img, index) => <img key={index} className='img--aside' src={img} alt={"user img"}/>)
                                }
                            </div>
                        </div>
                        <div className='friends__aside'>
                            <div className='flex-2'>
                                <h2>Znajomi</h2>
                                {/* dodaj ścieżke */}
                                <Link to="/">
                                    <p className='aside--link'>Pokaż wszystkich znajomych</p>
                                </Link>
                            </div>
                            <div className='friends__aside--container'>
                             
                                {   
                                    userDatabase.filter(currentUser => (
                                        watchedUser ? 
                                        watchedUser.getAllFriends().includes(currentUser.id)
                                        :
                                        user.getAllFriends().includes(currentUser.id)
                                    )).map(friend => (
                                            <div key={friend.id} className='friend-tile'>
                                                 <img src={friend.getProfileImg()} alt={"friend img"} />
                                                 <h5>{friend.getFullName()}</h5>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </aside>
                    <div className='profile--main__content'>
                        <div className='post-creator'>
                            <div className='post-creator__top'>
                                <img src={user.getProfileImg()} alt={"prifile img"} />
                                <div className='post-creator__btn' onClick={() => setDevelopProfile(prevState => ({...prevState, createPost: true }))}>
                                    {watchedUser ? `Napisz co myślisz na temat: ${watchedUser.getName()}...` : "Co słychać ?"}
                                </div>
                            </div>
                            <div className='post-creator__bottom'>
                                <div className='post-creator__opt' onClick={() => setDevelopProfile(prevState => ({...prevState, createPost: true }))}>
                                    <i className="fas fa-photo-video"></i>Zdjęcie/film
                                </div>
                                <div className='post-creator__opt' onClick={() => setDevelopProfile(prevState => ({...prevState, createPost: true }))}>
                                    <i className="fas fa-user-tag"></i>Oznacz znajomych
                                </div>
                                <div className='post-creator__opt' onClick={() => setDevelopProfile(prevState => ({...prevState, createPost: true }))}>
                                    <i className="fas fa-flag"></i>Wydarzenie z życia
                                </div>
                            </div>
                        </div>
                        { watchedUser ? 
                          watchedUser.getAllPosts().length > 0 && 
                          watchedUser.getAllPosts().map(post => (
                              <PostComponent key={post.getId()} post={post} watchedUser={watchedUser}  />
                              ))
                          :
                          user.getAllPosts().length > 0 && 
                          user.getAllPosts().map(post => (
                             <PostComponent key={post.getId()} post={post} watchedUser={watchedUser} />
                          ))
                        }
                    </div>
                </main>
            </div> 
        </section>
        
    );
}

export default ProfilePage;
