
class Comment {

    author;
    body;
    dateOfPublic;
    dateOfEdit;
    likes;

    constructor(author, body) {
        this.author = author;
        this.body = body;
        this.dateOfPublic = this.getDate();
        this.likes=0;
    }

    getDate() {
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const formatedDate = `${year}-${month}-${day}  ${date.getHours()}:${date.getMinutes()}`
        
        return formatedDate;
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