import React, {useContext} from 'react';
import "./Contacts.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import userDatabase from "../../DemoDatabase/userDatabase"
import FacebookItem from '../../Components/FacebookItem/FacebookItem';
import {MessengerOpenContext} from "../../hooks/Context/MessengerOpenContextProvider"

function Contacts() {

    const user = useContext(UserContext); 
    const friends = userDatabase.filter(currentUser => user.getAllFriends().includes(currentUser.id))

    const {openMessenger, setSelectUserMessages} = useContext(MessengerOpenContext);

    function handleClick(messageUser) {
        openMessenger()
        setSelectUserMessages(messageUser);
    }

    const activeFriends = friends.map(friend => (
                            <div key={friend.id} onClick={() => handleClick(friend)}>
                                <FacebookItem img={friend.getProfileImg()} text={friend.getFullName()} />
                            </div>
                        ))

  return (
    <div className='contacts__container'>
        <div className='contacts--header'>
            <h3>Kontakty</h3>
            <div className='contacts--opt'>
                <i className="fas fa-video"></i>
                <i className="fas fa-search"></i>
                <i className="fas fa-ellipsis-h"></i>
            </div>
        </div>
            <div className='contacts__content'>
                {activeFriends}
            </div>
    </div>
  );
}

export default Contacts;