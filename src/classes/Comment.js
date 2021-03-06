class Comment {

    author;
    authorImg;
    body;
    dateOfPublic;
    dateOfEdit;
    likes;

    constructor(author, body) {
        this.author = `${author.name} ${author.lastname}`;
        this.authorImg = author.profileImg;
        this.body = body;
        this.dateOfPublic = this.getDate();
        this.likes=0;
    }

    getDate() {
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
        const formatedDate = `${year}-${month}-${day}  ${hour}:${minute}`
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