import React, {useContext} from 'react';
import "./Contacts.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import userDatabase from "../../DemoDatabase/userDatabase"
import FacebookItem from '../../Components/FacebookItem/FacebookItem';
import {MessengerOpenContext} from "../../hooks/Context/MessengerOpenContextProvider"

function Contacts() {

  const user = useContext(UserContext); 
  const friends = userDatabase.filter(currentUser => user.getAllFriends().includes(currentUser.id))
//   friends.map(friend => console.log(friend.messages))

 const {openMessenger, setSelectUserMessages} = useContext(MessengerOpenContext);

function handleClick(messageUser) {
    openMessenger()
    setSelectUserMessages(messageUser);
}


  const activeFriends = friends.map(friend => (
                            <div onClick={() => handleClick(friend)}>
                                <FacebookItem img={friend.getProfileImg()} text={friend.getFullName()} />
                            </div>
                        ))

  return (
    <div className='contacts__container'>
        <div className='contacts--header'>
            <h3>Kontakty</h3>
            <div className='contacts--opt'>
                <i class="fas fa-video"></i>
                <i class="fas fa-search"></i>
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            <div className='contacts__content'>
                {activeFriends}
            </div>
    </div>
  );
}

export default Contacts;
