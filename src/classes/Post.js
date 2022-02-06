import { v4 as uuid } from 'uuid';

class Post {

    author;
    body;
    userId;
    img;
    dateOfPublic;
    dateOfEdit;
    likes;
    comments;

    // zastanów się jesze nad tymi idkami
    id;

    constructor(author, body, userId, dateOfPublic, img, likes=0, comments=[], id=uuid()) {
        this.author = author;
        this.userId = userId;
        this.body = body;
        this.dateOfPublic = dateOfPublic;
        this.img = img;
        this.likes = likes;
        this.comments = comments;
        this.id = id;
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

    addCommentToPost(author, body) {
        this.comments.push(new Comment(author, body));
    }

    editCommentForPost(commentId, body) {
        this.comments.find(comment => comment.id === commentId).editComment(body)
    }
    
    addLike() {
        this.likes ++;
    }

}

export default Post;