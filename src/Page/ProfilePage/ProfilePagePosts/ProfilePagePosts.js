import React from "react";
import PostComponent from "../../../Components/PostComponent/PostComponent";
import {Link} from "react-router-dom";
import userDatabase from "../../../DemoDatabase/userDatabase";

function ProfilePagePosts(props) {

    const {user, watchedUser, setDevelopProfile} = props

    return (
        <main className='profile--main'>       
                    <aside className='profile--main__aside' style={{top: "50px"}}>
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
    )
}

export default ProfilePagePosts;