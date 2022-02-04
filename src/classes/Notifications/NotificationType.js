class NotificationType {

    name;
    text;
    icon;
    
    constructor(name, text, icon) {
         this.name = name;
         this.text=text;
         this.icon=icon;
    }

    getName() {
        return this.name;
    }

    getText() {
        return this.text;
    }

    getIcon() {
        return this.icon;
    }
}

export default NotificationType;