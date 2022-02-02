import { v4 as uuid } from 'uuid';

class Post {

    author;
    body;
    dateOfPublic;
    dateOfEdit;
    likes;
    comments;

    // zastanów się jesze nad tymi idkami
    id;

    constructor(author, body) {
        this.author = author;
        this.body = body;
        this.dateOfPublic = new Date();
        this.likes = 0;
        this.comments = [];
        this.id = uuid();
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