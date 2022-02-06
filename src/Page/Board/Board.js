import React from 'react';
import "./Board.css";
import {useParams} from "react-router";
import users from '../../DemoDatabase/userDatabase';
import Navbar from "../Navbar/Navbar";
import {Switch, Route} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import PageCreator from '../PageCreator/PageCreator';
import ProfilePage from "../ProfilePage/ProfilePage";
import VideoPage from '../VideoPage/VideoPage';
import MarketPlacePage from "../MarketPlacePage/MarketPlacePage"
import GroupPage from "../GroupPage/GroupPage";

function Board() {

  const {userId} = useParams()
  const currentUser = users.find(user => user.id === userId);
  console.log(userId)
  console.log(currentUser)

//   popraw search component żeby wyszukiwał odpowiednie wartości w zależności od położena
//   dokończ demo dla PageCreator, VideoPage, MarketPlacePage, GroupPage

  return (
    <div className='container'>
        <Navbar />
        <div className='container__content'>
            <Switch>
                <Route exact path={`/board/${currentUser.id}`}>
                    <MainPage />
                </Route>
                <Route path={`/board/${currentUser.id}/pagesCreator`}>
                    <PageCreator />
                </Route>
                <Route path={`/board/${currentUser.id}/videos`}>
                    <VideoPage />
                </Route>
                <Route path={`/board/${currentUser.id}/marketplace`}>    
                    <MarketPlacePage />
                </Route>
                <Route path={`/board/${currentUser.id}/groups`}>
                    <GroupPage />
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
