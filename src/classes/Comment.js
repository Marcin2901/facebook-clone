
class Comment {

    author;
    body;
    dateOfPublic;
    dateOfEdit;
    likes;

    constructor(author, body) {
        this.author = author;
        this.body = body;
        this.dateOfPublic = new Date();
        this.likes=0;
    }

    editComment(body) {
        this.body = body;
        this.dateOfPublic = new Date();
    }

    addLike() {
        this.likes ++;
    }

}

export default Comment;