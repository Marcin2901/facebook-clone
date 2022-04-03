import React, { useContext, useState } from 'react';
import "./CreatePostComponent.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import {Link, useLocation} from "react-router-dom";
import FacebookItem from '../FacebookItem/FacebookItem';
import userDatabase from "../../DemoDatabase/userDatabase";

function CreatePostComponent(props) {

  const user = useContext(UserContext); 
  const {pathname} = useLocation()
  const {watchedUser} = props;

  const [postForm, setPostForm] = useState({
      postText: "",
      postImg: false
  }) 

  function toggleChange(event) {
    const {name, value} = event.target;
    setPostForm(prevState => ({
        ...prevState,
        [name]: value
    }))
  }

  function addPost() {
      //dodawanie posta *watchedUser => do tablicy obserwowanego usera *user do tablicy zalogowanego usera
      watchedUser ? 
      watchedUser.addPost(postForm.postText, postForm.postImg, getDate(), user.getId(), user.getFullName())
      :
      user.addPost(postForm.postText, postForm.postImg, getDate(), user.getId(), user.getFullName());
      
      //dodawanie powiadomień o nowym poście *watchedUser => w tablicy obserwowanego usera *user w tablicy zalogowanego usera
      //                                     *watcherUser.id => po wysłąniu posta wysyłamy też id właściciela tablicy
      userDatabase.forEach(currentUser => (
          currentUser.addNotification(user, 0, watchedUser ?
                              watchedUser.getAllPosts()[0] : user.getAllPosts()[0], watchedUser ? watchedUser.id : user.id)));
      localStorage.setItem("users", JSON.stringify(userDatabase));
  } 

  function getDate() {
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        const formatedDate = `${year}-${month}-${day}  ${hour}:${minute}`
        return formatedDate;
    }

  return (
      <div className='create-post__container'>
          <div className='create-post--content'>
              <header className='create-post--header'>
                  <h2>Utwórz post</h2>
                  <Link to={pathname}>
                    <div className="exit">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                    </div>
                   </Link>
              </header>
              <FacebookItem img={user.getProfileImg()} text={user.getFullName()}
                            alternativeText={<><i className="fas fa-globe-europe"></i> Publicznie</>}
              />
              <textarea className='create-post--text' placeholder='Co słychać'
                        name='postText'
                        value={postForm.postText}
                        onChange={toggleChange} />
              <div className='create-post-plus'>
                  <h3>Dodaj do posta</h3>
                  <i className="fas fa-images"></i>
                  <i className="fas fa-user-tag"></i>
                  <i className="far fa-laugh-wink"></i>
              </div>
              <Link to={pathname}>
                 <button className='public-post--btn btn' onClick={addPost}>Opublikuj</button>
              </Link>
          </div>
      </div>
  )
}

export default CreatePostComponent;