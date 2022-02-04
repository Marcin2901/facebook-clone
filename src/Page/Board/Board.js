import React from 'react';
import "./Board.css";
import {useParams} from "react-router";
import users from '../../DemoDatabase/userDatabase';
import Navbar from "../Navbar/Navbar";
import {Switch, Route} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import ProfilePage from "../ProfilePage/ProfilePage";

function Board() {

  const {userId} = useParams()
  const currentUser = users.find(user => user.id === userId);

  return (
    <div className='container'>
        <Navbar />
        <div className='container__content'>
            <Switch>
                <Route exact path={`/board/${currentUser.id}`}>
                    <MainPage />
                </Route>
                <Route path={`/board/${currentUser.id}/pagesCreator`}>
                    <h1>Page Creator</h1>
                    {/* <PageCreator /> */}
                </Route>
                <Route path={`/board/${currentUser.id}/videos`}>
                    <h1>Videos</h1>
                    {/* <VideoPage /> */}
                </Route>
                <Route path={`/board/${currentUser.id}/marketplace`}>
                    <h1>Market Place</h1>
                    {/* <MarketPlacePage /> */}
                </Route>
                <Route path={`/board/${currentUser.id}/groups`}>
                    <h1>Your Groups</h1>
                    {/* <GroupPage /> */}
                </Route>
                <Route exact path={`/board/${currentUser.id}/profile`}>
                    <ProfilePage />
                </Route>
                <Route path={`/board/${currentUser.id}/profile/:findUserId`}>
                     <ProfilePage />
                </Route>
            </Switch>
        </div>
    </div>
    );
}

export default Board;
