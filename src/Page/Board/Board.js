import React from 'react';
import {useParams} from "react-router"
import users from '../../DemoDatabase/userDatabase';

function Board() {

  const {userId} = useParams()

  return (
    <div>
        <h1>{`to jest to: ${userId}`}</h1>
        <h1>I am here</h1>
    </div>
    );
}

export default Board;
