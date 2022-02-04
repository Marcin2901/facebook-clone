import NotificationType from "./NotificationType";

class Notification {

    notificationOwner;
    notificationImage;
    notificationBody;
    notificationDate;
    alreadyRead;

    birthText = `${this.notificationOwner.getFullName()} ${this.notificationDate === new Date() ?
                 "ma dziś urodziny. Prześlij życzenia" : "miał urodziny, dnia: " + this.notificationDate.getDate()}`;
    groupText = `${this.notificationOwner.getFullName()} dodał post na grupie [NAZWA_GRUPY]`
    postText = `${this.notificationOwner.getFullName()} dodał nowy post na osi czasu`
    commentText = `${this.notificationOwner.getFullName()} skomentował [TWÓJ POST] : [POST UŻYTKOWNIKA ...] `
    inviteText = `${this.notificationOwner.getFullName()} wysłał Ci zaproszenie do grona znajomych`             
                 
    notificationType = [
                        new NotificationType("birth", this.birthText , `<i class="fas fa-birthday-cake"></i>`),
                        new NotificationType("group", this.groupText, `<i class="fas fa-users"></i>`),
                        new NotificationType("post", this.postText, `<i class="fas fa-address-card"></i>`),
                        new NotificationType("comment", this.commentText, `<i class="fas fa-comment-dots"></i>`),
                        new NotificationType("invite", this.inviteText, `<i class="far fa-handshake"></i>`)
                       ]

    constructor(notificationOwner, type) {
         this.notificationOwner = notificationOwner;
         this.notificationImage = this.notificationOwner.getProfileImage();
         this.notificationDate = new Date();
         this.notificationBody = this.notificationType[type];
         this.alreadyRead = false;
  }

  getNotificationImage() {
    return this.notificationImage;
  }

  getNotificationBody() {
    return this.notificationBody;
  }

  getNotificationDate() {
    return this.notificationDate;
  }

  isAlreadyRead() {
      return this.alreadyRead;
  }

}



export default Notification;