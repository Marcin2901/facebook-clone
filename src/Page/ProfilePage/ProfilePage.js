import React, {useContext, useState} from 'react';
import "./ProfilePage.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import {Link, Switch, Route, useParams} from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase";
import PostComponent from "../../Components/PostComponent/PostComponent"
import CreatePostComponent from '../../Components/CreatePostComponent/CreatePostComponent';
import {ScrollToContext} from "../../hooks/Context/ScrollToContextProvider";
import ProfilePagePosts from './ProfilePagePosts/ProfilePagePosts';


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

    // const [scrollDirection, setScrollDirection] = useState(false)
    // React.useEffect(() => {
    //     // zapewnia że strona nie będzie się scrolować do dołu 
    //     //to niżej do usunięcia!
    //     window.scrollTo(0, 0);
    //     // true jeśli scroll up i false jeśli scroll down
    //     window.addEventListener('scroll', () => {(window.onscroll = function(e) {
    //         setScrollDirection(this.oldScroll > this.scrollY);
    //         this.oldScroll = this.scrollY;
    //       })})
    //       //ogarnij to czyszczenie
    //     // return function cleanup() {
    //     //         window.removeEventListener("scroll");
    //     // }
    // }, [])

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
                            <Link to={!watchedUser ? `/board/${user.id}/profile` : `/board/${watchedUser.id}/profile/`}>
                                 <li className='active'>Posty</li>
                            </Link>
                            <Link to={!watchedUser ? `/board/${user.id}/profile/info` : `/board/${watchedUser.id}/profile/info`}>
                                 <li>Informacje</li>
                            </Link>
                            <Link to={!watchedUser ? `/board/${user.id}/profile/friends` : `/board/${watchedUser.id}/profile/friends`}>
                                 <li>Znajomi<span className='friends-quantity'>0</span></li>
                            </Link>
                            <Link to={!watchedUser ? `/board/${user.id}/profile/photos` : `/board/${watchedUser.id}/profile/photos`}>
                                 <li>Zdjęcia</li>
                            </Link>
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

                    <Switch>
                        <Route exact path={!watchedUser ? `/board/${user.id}/profile` : `/board/${watchedUser.id}/profile`}>
                            <ProfilePagePosts user={user} watchedUser={watchedUser} setDevelopProfile={setDevelopProfile}/>
                        </Route>
                        <Route path={!watchedUser ? `/board/${user.id}/profile/info` : `/board/${watchedUser.id}/profile/info`}>
                            {/* <ProfilePageInfo /> */}
                        </Route>    
                        <Route path={!watchedUser ? `/board/${user.id}/profile/friends` : `/board/${watchedUser.id}/profile/friends`}>
                            {/* <ProfilePageFriends /> */}
                        </Route>
                        <Route path={!watchedUser ? `/board/${user.id}/profile/photos` : `/board/${watchedUser.id}/profile/photos`}>
                            {/* <ProfilePagePhotos /> */}
                        </Route>
                    </Switch>
                
            </div> 
        </section>
        
    );
}

export default ProfilePage;
