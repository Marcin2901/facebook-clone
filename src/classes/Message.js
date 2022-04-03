import { v4 as uuid } from 'uuid';

class Message {

    userOneId;
    userTwoId;
    messagesArray;
    alreadyRead;
    messengerId;

    constructor(userOneId, userTwoId, alreadyRead) {
        this.userOneId = userOneId;
        this.userTwoId = userTwoId;
        this.messagesArray=[]
        this.alreadyRead = alreadyRead;
        this.messengerId = uuid();
    }
}

export default Message;