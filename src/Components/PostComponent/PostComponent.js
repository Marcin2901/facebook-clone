import React, {useContext} from "react";
import "./PostComponent.css";
import FacebookItem from "../FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";
import {UserContext} from "../../hooks/Context/UserContextProvider";

function PostComponent(props) {

    const userId = props.userId;
    // const currentUser = useContext(UserContext)
    // const user = props.watchdUser ? currentUser : userDatabase.find(currentUser => currentUser.id === userId);
    const user = userDatabase.find(currentUser => currentUser.id === userId);
    console.log(user)
    return (
        <div className="post">
            <div className="post--content">
                <FacebookItem img={user.getProfileImg()} text={props.author}
                              alternativeText={<span className="post--date">{props.date.toString().slice(0, 10)}</span>}
                              size={"big"} />
                <p className="post--text">{props.text}</p>
            </div>
            {props.img &&
            <div className="post--img">
                <img src={props.img} />
            </div>
            }
            <div className="post--meta">
                <div className="post--comments"></div>
                <div className="post--opt">
                    <div>Lubie to!</div>
                    <div>Komentarz</div>
                    <div>Udostępnij</div>
                </div>
            </div>
        </div>
    )
}

export default PostComponent;