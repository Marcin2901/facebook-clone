import Post from "./Post";
import Message from "./Message";
import Notification from "./Notifications/Notification";
import { v4 as uuid } from 'uuid';
import defaultPicture from "../DemoDatabase/profile-img.jpg";

class User {

    id;
    name;
    lastname;
    age;
    dateOfBirth;
    sex;
    email;
    password;
    posts = [];
    comments = [];
    profileImg;
    wasLoged;
    hasAccess;
    images = [];
    friends = [];
    notifications = []
    messages = [];

    constructor(name, lastname, dateOfBirth, sex, email, password,
                profileImg=defaultPicture, wasLoged=false, hasAccess=false, posts=[],
                id=uuid(), friends=[], notifications=[], messages=[]) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.email = email;
        this.password = password;
        this.profileImg = profileImg;
        this.wasLoged = wasLoged;
        this.hasAccess = hasAccess;
        this.posts=posts;
        this.images.push(profileImg);
        this.friends = friends;
        this.notifications = notifications;
        this.messages=messages;
    }

    addPost(body, img=false, dateOfPublic, userId=this.getId(), author=this.getFullName()) {
        this.posts.unshift(new Post(author, body, userId, dateOfPublic, img));
    }

    getAllPosts() {
        return this.posts;
    }

    editMyPost(postId, body) {
        this.posts.find(post => post.id === postId).editPost(body);
    }

    addMessenger(userOneId, userTwo, alreadyReadObj) {
        const messenger = new Message(userOneId, userTwo.id, alreadyReadObj)
        this.messages.push(messenger);
        userTwo.messages.push(messenger);
    }

    getMessengerId(userOneId, userTwoId) {
        const findMessenger = this.messages.find(messenger =>( messenger.userOneId===userOneId || messenger.userOneId===userTwoId ) && (messenger.userTwoId===userTwoId || messenger.userTwoId===userOneId))
        if(findMessenger) {
            return findMessenger.messengerId
        } 
        return null;
    }

    addMessageToMessenger(userOneId, userTwoId, text) {
        const messengerId  = this.getMessengerId(userOneId, userTwoId)
        const findMessenger = this.messages.find(message => message.messengerId === messengerId);
        findMessenger.messagesArray.unshift({userOneId, text});
    }

    getMessagesFromMessenger(userOneId, userTwoId) {
        const messengerId  = this.getMessengerId(userOneId, userTwoId)
        if(messengerId === null)  return null;
        const findMessenger = this.messages.find(message => message.messengerId === messengerId);
        return findMessenger;
    }

    //*userOneId => user dla którego sprawdzamy
    //*userTwoId => user potrzebny do znalezienia odpowiedniego messengera
    isMessagesAlreadyRead(userOneId, userTwoId) {
        const findMessenger = this.getMessagesFromMessenger(userOneId, userTwoId)
        const currentUser = findMessenger.alreadyRead.filter(set => set.userId === userOneId);
        return currentUser[0].isRead
    }

    setIsReadToTrue(userOneId, userTwoId) {
        const findMessenger = this.getMessagesFromMessenger(userOneId, userTwoId)
        const currentUser = findMessenger.alreadyRead.filter(set => set.userId === userOneId);
        currentUser[0].isRead = true;
    }

    setIsReadToFalse(userOneId, userTwoId) {
        const findMessenger = this.getMessagesFromMessenger(userOneId, userTwoId)
        const currentUser = findMessenger.alreadyRead.filter(set => set.userId === userTwoId);
        currentUser[0].isRead = false;
    }

    addComment(postId, body) {
        this.posts.find(post => post.id === postId).addComment(this.name, body);
    }

    changePassword(password) {
        this.password = password;
    }

    setAccess(bool) {
        this.hasAccess = bool;
    }

    getProfileImg() {
        return this.profileImg;
    }

    getAllImages() {
        return this.images;
    }

    getName() {
        return this.name;
    }

    getLastname() {
        return this.lastname
    }

    getFullName() {
        return `${this.name} ${this.lastname}`;
    }

    getAllFriends() {
        return this.friends;
    }

    addNotification(notificationOwner, type, target, boardOwnerId=null) {
        this.notifications.unshift(new Notification(notificationOwner, type, target, boardOwnerId));
    }

    getAllNotifications() {
        return this.notifications;
    }

    getNotification(index) {
        return this.notifications[index];
    }

    getId() {
        return this.id;
    }
}

export default User;