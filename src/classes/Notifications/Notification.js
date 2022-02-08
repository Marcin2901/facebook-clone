

class Notification {

    notificationOwner;
    notificationImage;
    notificationBody;
    notificationDate;
    alreadyRead;
    type;
    target;
    boardOwnerId;

    notificationType = [ 
                          { text: ` nowy post na osi czasu`, icon: `<i class="fas fa-address-card"></i>`},
                          { text: ` [TWÓJ POST] : [POST UŻYTKOWNIKA ...] `, icon: `<i class="fas fa-comment-dots"></i>`},
                          { text: ` zaproszenie do grona znajomych` , icon: `<i class="far fa-handshake"></i>`}
                       ]

    constructor(notificationOwner, type, target, boardOwnerId) {
         this.notificationOwner = notificationOwner.getFullName();
         this.notificationImage = notificationOwner.getProfileImg();
         this.notificationDate = this.getDate();
         this.notificationBody = this.notificationType[type];
         this.alreadyRead = false;
         this.type = type;
         this.target  = target;
         this.boardOwnerId = boardOwnerId;
  }

    getDate() {
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes}` : `${date.getMinutes()}`
        const formatedDate = `${year}-${month}-${day}  ${hour}:${minute}`
        return formatedDate;
    }

}



export default Notification;