import React, {useContext} from "react"
import "../Option.css";
import "./AccountOption.css";
import {Link} from "react-router-dom";
import FacebookItem from "../../FacebookItem/FacebookItem";
import {UserContext} from "../../../hooks/Context/UserContextProvider";
import { MessengerOpenContext } from "../../../hooks/Context/MessengerOpenContextProvider";

function AccountOption() {

    const user = useContext(UserContext);
    const {closeMessenger} = useContext(MessengerOpenContext);

    return (
        <div className="option__container account__container">
           <div className="account--opt">
                 <Link  to={`/board/${user.id}/profile`}>
                 <FacebookItem img={user.getProfileImg()} 
                               text={user.getFullName()}
                               alternativeText={<span className="account--opt-span">Zobacz swój profil</span>}
                 />
                 </Link>
           </div>
           <div className="account--opt">
                 <FacebookItem icon={<i className="fas fa-info-circle"></i>}
                               text={"Przekaż opinię"} 
                               alternativeText={<span className="account--opt-span">Pomóż mi ulepszyć Facebooka</span>}
                 />
                 
           </div>
           <div className="account--set">
                 <FacebookItem icon={<i className="fas fa-cog"></i>} text={"Ustawienia i prywantość"} />
                 <i className="fas fa-chevron-right"></i>
           </div>
           <div className="account--set">
                 <FacebookItem icon={<i className="fas fa-question-circle"></i>} text={"Pomoc i wsparcie"}/>
                 <i className="fas fa-chevron-right"></i>
           </div>
           <div className="account--set">
                 <FacebookItem icon={<i className="fas fa-moon"></i>} text={"Wyświetlanie i ułatwienie dostępu"}/>
                 <i className="fas fa-chevron-right"></i>
           </div>
           <Link to={"/"} onClick={closeMessenger}>
               <FacebookItem icon={<i className="fas fa-sign-out-alt"></i>} text={"Wyloguj się"}/>
           </Link>
           <small>Facebook &copy; 2022</small>
        </div>
    )
}

export default AccountOption;