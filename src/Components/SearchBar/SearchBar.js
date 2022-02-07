import React, { useContext, useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/Context/UserContextProvider";
import FacebookItem from "../FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";
import {MessengerOpenContext} from "../../hooks/Context/MessengerOpenContextProvider";

function SearchBar(props) {

    const user = useContext(UserContext);
    const [searchUsers, setSearchUsers] = useState({searchUser: ""})
    const [foundUsers, setFoundUsers] = useState([])

    const {openMessenger, setSelectUserMessages} = useContext(MessengerOpenContext);

    function handleClick(messageUser) {
        openMessenger()
        setSelectUserMessages(messageUser);
        props.closeAllOption();
    }
    

    React.useEffect(() => {
        const found = [];
        for(let user of userDatabase) {
            (user.getName().toLowerCase().includes(searchUsers.searchUser.toLowerCase()) ||
            user.getLastname().toLowerCase().includes(searchUsers.searchUser.toLowerCase())) &&
            searchUsers.searchUser &&
            found.push(user);
        }
        setFoundUsers(found);
    }, [searchUsers])

    function handleChange(event) {
        const {name, value} = event.target;
        setSearchUsers(prevState => ({[name]: value}));
    }

  function handleArrowBack() {
    setTimeout(() => {
        setSearchUsers({searchUser: ""})
    }, 500);
    document.querySelector('.foundUsers__container').classList.add("hide")
  }


   return (
        <div className="serach--container">
            {props.isInNavbar ?
            <Link to={`/board/${user.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="48px" height="48px"> 
                            <linearGradient id="nT5WH7nXAOiS46rXmee3Ob" x1="32" x2="32" y1="-3.34" y2="59.223" gradientTransform="matrix(1 0 0 -1 0 66)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#155cde"/>
                            <stop offset=".278" stopColor="#1f7fe5"/>
                            <stop offset=".569" stopColor="#279ceb"/>
                            <stop offset=".82" stopColor="#2cafef"/>
                            <stop offset="1" stopColor="#2eb5f0"/>
                            </linearGradient><path fill="url(#nT5WH7nXAOiS46rXmee3Ob)" d="M58,32c0,13.35-10.05,24.34-23,25.83C34.02,57.94,33.01,58,32,58c-1.71,0-3.38-0.17-5-0.49	C15.03,55.19,6,44.65,6,32C6,17.64,17.64,6,32,6S58,17.64,58,32z"/>
                            <path fill="#fff" d="M42.8,36.05l-0.76,2C41.6,39.22,40.46,40,39.19,40H35v17.83C34.02,57.94,33.01,58,32,58	c-1.71,0-3.38-0.17-5-0.49V40h-2.95C22.36,40,21,38.66,21,37v-2c0-1.66,1.36-3,3.05-3H27v-6c0-5.51,4.49-10,10-10h3	c2.21,0,4,1.79,4,4s-1.79,4-4,4h-3c-1.1,0-2,0.9-2,2v6h4.95C42.08,32,43.55,34.09,42.8,36.05z"/>
                    </svg>
            </Link> :
            <div className="arrow--placekeeper"></div>
            }
            <div className='search-input'>
                <input type="text"
                    name='searchUser'
                    value={searchUsers.searchUser}
                    onChange={(e) => handleChange(e)}
                    placeholder='Szukaj na Facebooku'
                    autoComplete="off"
                />
                <i className="fas fa-search"></i>
            </div>
            {props.isInNavbar ? searchUsers.searchUser && 
                <div className='foundUsers__container foundUsers__profile'>
                    <div className='arrow-back' onClick={handleArrowBack}><i className="fas fa-arrow-left"></i></div>
                    {foundUsers.map(currentUser => (
                        <Link to={`/board/${user.id}/${props.linkTo}/${currentUser.id}`}>
                            <FacebookItem key={currentUser.id}
                                          img={currentUser.getProfileImg()}
                                          text={currentUser.getFullName()}
                                          alternativeText={!props.isInNavbar && "zobacz wiadomośći"}
                                          size={!props.isInNavbar && "big"}/>
                        </Link>
                    ))}
                </div>
                : searchUsers.searchUser && 
                <div className='foundUsers__container foundUsers__messages'>
                    <div className='arrow-back' onClick={handleArrowBack}><i className="fas fa-arrow-left"></i></div>
                    {foundUsers.map(currentUser => (
                        <div onClick={() => handleClick(currentUser)}>
                            <FacebookItem key={currentUser.id}
                                img={currentUser.getProfileImg()}
                                text={currentUser.getFullName()}
                                alternativeText={!props.isInNavbar && "zobacz wiadomośći"}
                                size={!props.isInNavbar && "big"}/>        
                        </div>
                    ))}
                    <span className="foundUsers__messages--info">Znalezione wiadomości</span>
                </div>
            }
        </div>
   )
}

export default SearchBar;