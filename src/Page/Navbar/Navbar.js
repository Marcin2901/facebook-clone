import React, {useState, useContext} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import "./Navbar.css";
import {UserContext} from "../../hooks/Context/UserContextProvider";
import SearchBar from "../../Components/SearchBar/SearchBar"
import FacebookItem from "../../Components/FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";
import MenuOption from "../../Components/Options/MenuOption/MenuOption";
import MessengerOption from '../../Components/Options/MessengerOption/MessengerOption';
import NotificationsOption from '../../Components/Options/NotificationsOption/NotificationsOption';
import AccountOption from '../../Components/Options/AccountOption/AccountOption';

function Navbar() {

    

  const user = useContext(UserContext);
  const location = useLocation()

  const [openOption, setOpenOption] = useState({
      menu: false,
      messenger: false,
      notifications: false,
      account: false
  })

  function handleOption(event) {
      const {id} = event.target;
      setOpenOption(prevState => ({
        menu: false,
        messenger: false,
        notifications: false,
        account: false,
        [id]: !prevState[id]
      }))    
  }

  function closeAllOption() {
      setOpenOption({
        menu: false,
        messenger: false,
        notifications: false,
        account: false,
      })
  }
 

  return (
      <nav className='nav'>
          <div className='nav__search'>
               <SearchBar linkTo={"profile"} isInNavbar={true}/>
          </div>
          <div className='nav__main'>
              <ul className='nav__main--ul'>
                    <Link to={`/board/${user.id}`}>
                         <li className={`${location.pathname === `/board/${user.id}` && "active"} tooltip`}>
                             <i className="fas fa-home"></i>
                             <span className='tooltiptext'>Strona Główna</span>
                        </li>
                    </Link>
                    <Link to={`/board/${user.id}/pagesCreator`}>
                        <li className={`${location.pathname === `/board/${user.id}/pagesCreator` && "active"} tooltip`}>
                            <i className="far fa-flag"></i>
                            <span className='tooltiptext'>Strony</span>
                        </li>
                    </Link>
                    <Link to={`/board/${user.id}/videos`}>
                        <li className={`${location.pathname === `/board/${user.id}/videos` && "active"} tooltip`}>
                            <i className="far fa-play-circle"></i>
                            <span className='tooltiptext'>Watch</span>
                        </li>
                    </Link>
                    <Link to={`/board/${user.id}/marketplace`}>
                        <li className={`${location.pathname === `/board/${user.id}/marketplace` && "active"} tooltip`}>
                            <i className="fas fa-store-alt"></i>
                            <span className='tooltiptext'>Marketplace</span>
                        </li>
                    </Link>
                    <Link to={`/board/${user.id}/groups`}>
                        <li className={`${location.pathname === `/board/${user.id}/groups` && "active"} tooltip`}>
                            <i className="fas fa-users"></i>
                            <span className='tooltiptext'>Grupy</span>
                        </li>
                    </Link>
              </ul>
          </div>
          <div className='nav__menu'>
              <Link to={`/board/${user.id}/profile`}
                    className={`${location.pathname === `/board/${user.id}/profile` && "active"}`}
              >
                  <FacebookItem img={user.getProfileImg()} text={user.getName()} size="small"
                                />
              </Link>
              <div className={`nav--opt menu ${openOption.menu && "active"}`} >
                  <div id='menu' className='nav--opt__click-area tooltip' onClick={(e) => handleOption(e)}>
                      <span className='tooltiptext'>Menu</span>
                  </div>
                  <div className='menu-i-wrapper'>
                     <i className="fas fa-ellipsis-h"></i>
                     <i className="fas fa-ellipsis-h"></i>
                     <i className="fas fa-ellipsis-h"></i>
                  </div>
                  {openOption.menu && <MenuOption />}
              </div>
              <div  className={`nav--opt messenger ${openOption.messenger && "active"}`}>
                  <div id="messenger" className='nav--opt__click-area tooltip'  onClick={(e) => handleOption(e)}>
                      <span className='tooltiptext'>Messenger</span>
                      {
                          document.querySelectorAll('.new-message').length > 0 &&
                          <sapn className="nav--opt-update">{document.querySelectorAll('.new-message').length}</sapn>
                      }
                  </div>
                  <i className="fab fa-facebook-messenger"></i>
                  {openOption.messenger && <MessengerOption openOption={openOption} closeAllOption={closeAllOption}/>}
              </div>
              <div  className={`nav--opt notifications ${openOption.notifications && "active"}`}>
                  <div id="notifications" className='nav--opt__click-area tooltip' onClick={(e) => handleOption(e)}>
                       <span className='tooltiptext'>Powiadomienia</span>
                       {
                           user.notifications.filter(notification => !notification.alreadyRead).length > 0 &&
                           <sapn className="nav--opt-update">{user.notifications.filter(notification => !notification.alreadyRead).length}</sapn>
                       }
                  </div>
                  <i className="fas fa-bell"></i>
                  {openOption.notifications && <NotificationsOption />}
              </div>
              <div  className={`nav--opt account ${openOption.account && "active"}`}>
                  <div id="account" className='nav--opt__click-area tooltip' onClick={(e) => handleOption(e)}>
                      <span className='tooltiptext'>Konto</span>
                  </div>
                  <i className="fas fa-sort-down"></i> 
                  {openOption.account && <AccountOption />}
              </div>
          </div>
      </nav>
  )
}

export default Navbar;
