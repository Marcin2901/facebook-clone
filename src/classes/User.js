
import Post from "./Post";
import Comment from "./Comment";
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

    constructor(name, lastname, dateOfBirth, sex, email, password,
                profileImg=defaultPicture, wasLoged=false, hasAccess=false,
                id=uuid(), friends=[], notifications=[]) {
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
        this.images.push(profileImg);
        this.friends = friends;
        this.notifications = notifications;
    }

    addPost(body) {
        this.posts.push(new Post(this.name, body));
    }

    getAllPosts() {
        return this.posts;
    }

    //to są obiekty więc u urzotkownika powinny się referencyjnie aktualizować
    editMyPost(postId, body) {
        this.posts.find(post => post.id === postId).editPost(body);
    }

    removeMyPost(post) {
        //czy ten co usuwa to właściciel posta?
    }

    addComment(postId, body) {
        this.posts.find(post => post.id === postId).addComment(this.name, body);
    }

    editComment() {

    }

    removeMyComment() {
        //czy ten co usuwa to właściciel komentarza?
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

    addNotification(notification) {
        this.notifications.push(notification);
    }

    getAllNotifications() {
        return this.notifications;
    }

    getNotification(index) {
        return this.notifications[index];
    }


}

export default User;