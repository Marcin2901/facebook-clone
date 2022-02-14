import React, {useContext, useState} from 'react';
import "./ProfilePage.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import {Link, Switch, Route, useParams, useLocation} from "react-router-dom";
import userDatabase from "../../DemoDatabase/userDatabase";
import PostComponent from "../../Components/PostComponent/PostComponent"
import CreatePostComponent from '../../Components/CreatePostComponent/CreatePostComponent';
import {ScrollToContext} from "../../hooks/Context/ScrollToContextProvider";
import ProfilePagePosts from './ProfilePagePosts/ProfilePagePosts';
import ProfilePageInfo from "./ProfilePageInfo/ProfilePageInfo";
import ProfilePageFriends from './ProfilePageFriends/ProfilePageFriends';
import ProfilePagePhotos from './ProfilePagePhotos/ProfilePagePhotos';


function ProfilePage() {
    
    const user = useContext(UserContext);
    const {findUserId} = useParams()
    const location = useLocation();

    //właściciel obserwowanego profilu
    const watchedUser = userDatabase.find(currentUser => currentUser.id === findUserId && user.id !== findUserId)

    const [developProfile, setDevelopProfile] = useState({
        changeProfileImg: false,
        changeBackgroundImg: false,
        createPost: false
    })

    const {scrollElemId, setScrollElemId} = useContext(ScrollToContext);
    
    //ustawianie OY na post z powiadomień
    React.useEffect(() => {
        if(scrollElemId) {
            const scrollElem =  document.getElementById(scrollElemId);
            window.scrollTo(0, scrollElem.offsetTop - 120);
            setScrollElemId(null);
        }
    }, [scrollElemId])

    function isActive(urlEnding) {
       
        if(location.pathname === `/board/${user.id}/profile${urlEnding}`
        ) {
            return "active";
        } 
        else if(watchedUser && location.pathname === `/board/${user.id}/profile/${watchedUser.id}${urlEnding}`) {
            return "active";
        }
        return "";
    }

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
                            <Link to={!watchedUser ? `/board/${user.id}/profile` :
                                                     `/board/${user.id}/profile/${watchedUser.id}`}>
                                 <li  className={isActive("")}>Posty</li>
                            </Link>
                            <Link to={!watchedUser ? `/board/${user.id}/profile/info` :
                                                     `/board/${user.id}/profile/${watchedUser.id}/info`}
                            >
                                 <li className={isActive("/info")}>Informacje</li>
                            </Link>
                            <Link to={!watchedUser ? `/board/${user.id}/profile/friends` :
                                                     `/board/${user.id}/profile/${watchedUser.id}/friends`}
                            >
                                 <li className={isActive("/friends")}>
                                     Znajomi <span className='friends-quantity'>{user.getAllFriends().length}</span>
                                </li>
                            </Link>
                            <Link to={!watchedUser ? `/board/${user.id}/profile/photos` :
                                                     `/board/${user.id}/profile/${watchedUser.id}/photos`}>
                                 <li className={isActive("/photos")}>Zdjęcia</li>
                            </Link>
                                 <li>Więcej <i className="fas fa-sort-down"></i></li>
                        </ul>
                        <div className='profile__nav--buttons'>
                            {  watchedUser ?
                                <>
                                <button className='btn edit--btn'><i class="fas fa-user-friends"></i>Znajomi</button>
                                <button className='rel--btn btn login--btn'>
                                    <span className='plus-icon--bg'>
                                        <i class="fab fa-facebook-messenger"></i>
                                    </span>Wyślij wiadomość
                                </button>
                                </> :
                                <>
                                <button className='rel--btn btn login--btn'>
                                    <span className='plus-icon--bg'>
                                        <i className="fas fa-plus"></i>
                                    </span>Utwórz relację
                                </button>
                                <button className='btn edit--btn'><i className="fas fa-pen"></i>Edytuj profil</button>
                                </>
                            }
                        </div>
                    </nav>

                </header>
            </div>

            <div className='profile__main--container'>  

                    <Switch>
                     
                        <Route path={!watchedUser ? `/board/${user.id}/profile/info` :
                                                    `/board/${user.id}/profile/${watchedUser.id}/info`}>
                            <ProfilePageInfo />
                        </Route>    
                        <Route path={!watchedUser ? `/board/${user.id}/profile/friends` :
                                                    `/board/${user.id}/profile/${watchedUser.id}/friends`}>
                            <ProfilePageFriends />
                        </Route>
                        <Route path={!watchedUser ? `/board/${user.id}/profile/photos` :
                                                    `/board/${user.id}/profile/${watchedUser.id}/photos`}>
                            <ProfilePagePhotos />
                        </Route>
                        <Route  path={!watchedUser ? `/board/${user.id}/profile` :
                                                     `/board/${user.id}/profile/${watchedUser.id}`}>
                            <ProfilePagePosts user={user}
                                              watchedUser={watchedUser} 
                                              setDevelopProfile={setDevelopProfile}/>
                        </Route>
                    </Switch>
                
            </div> 
        </section>
        
    );
}

export default ProfilePage;
