import React, {useContext} from 'react';
import "./Contacts.css";
import { UserContext } from '../../hooks/Context/UserContextProvider';
import userDatabase from "../../DemoDatabase/userDatabase"
import FacebookItem from '../../Components/FacebookItem/FacebookItem';

function Contacts() {

  const user = useContext(UserContext); 
  const friends = userDatabase.filter(currentUser => user.getAllFriends().includes(currentUser.id))
  const activeFriends = friends.map(friend => (
      
      <FacebookItem img={friend.getProfileImg()} text={friend.getFullName()} />
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
