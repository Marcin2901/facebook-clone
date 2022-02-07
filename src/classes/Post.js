import { v4 as uuid } from 'uuid';
import Comment from './Comment';
class Post {

    author;
    body;
    userId;
    img;
    dateOfPublic;
    dateOfEdit;
    likes;
    comments;
    id;
    shareQuantity;

    constructor(author, body, userId, dateOfPublic, img, likes=[], comments=[], id=uuid()) {
        this.author = author;
        this.userId = userId;
        this.body = body;
        this.dateOfPublic = dateOfPublic;
        this.img = img;
        this.likes = likes;
        this.comments = comments;
        this.id = id;
        this.shareQuantity = 0;
    }

    getAuthor() {
        return this.author;
    }

    getDate() {
        return this.dateOfPublic
    }

    getBody() {
        return this.body;
    }

    getImg() {
        return this.img;
    }

    getId() {
        return this.id;
    }

    editPost(body) {
        this.body = body;
        this.dateOfEdit = new Date();
    }

    getComments() {
        return this.comments;
    }

    addComment(author, body) {
        this.comments.unshift(new Comment(author, body));
    }

    editCommentForPost(commentId, body) {
        this.comments.find(comment => comment.id === commentId).editComment(body)
    }
    
    addLike(userId) {
        this.likes.push(userId);
    }

    
    subtractLike(userId) {
        this.likes = this.likes.filter(likeId => likeId !== userId)
    }

    getLikes() {
        return this.likes;
    }

    getShareQuantity() {
        return this.shareQuantity;
    }


}

export default Post;