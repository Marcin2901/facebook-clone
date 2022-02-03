import React from 'react';
import "./Board.css";
import {useParams} from "react-router";
import users from '../../DemoDatabase/userDatabase';
import Navbar from "../Navbar/Navbar";
import {Switch, Route} from "react-router-dom";

function Board() {

  const {userId} = useParams()
  const currentUser = users.find(user => user.id === userId);

  return (
    <div className='container'>
        <Navbar />
        <div className='container__content'>
            <Switch>
                <Route exact path={`/board/${currentUser.id}`}>
                    <h1>Main Content</h1>
                </Route>
                <Route path={`/board/${currentUser.id}/pagesCreator`}>
                    <h1>Page Creator</h1>
                </Route>
                <Route path={`/board/${currentUser.id}/videos`}>
                    <h1>Videos</h1>
                </Route>
                <Route path={`/board/${currentUser.id}/marketplace`}>
                    <h1>Market Place</h1>
                </Route>
                <Route path={`/board/${currentUser.id}/groups`}>
                    <h1>Your Groups</h1>
                </Route>
                <Route path={`/board/${currentUser.id}/profile`}>
                    <h1>Profile</h1>
                </Route>
            </Switch>
        </div>
    </div>
    );
}

export default Board;
